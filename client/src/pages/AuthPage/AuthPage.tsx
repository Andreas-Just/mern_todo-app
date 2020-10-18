import React, { ChangeEvent, useEffect, useState } from 'react';
import { useMessage } from '../../hooks/messageHook';
import { useHttp } from '../../hooks/httpHook';
import { useAuth } from '../../hooks/authHook';
import './AuthPage.scss';

export const AuthPage = () => {
  const message = useMessage();
  const { login } = useAuth();
  const {
    loading, request, error, clearError,
  } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });

      message(data.message);
    } catch (err) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });

      login(data.token, data.userId);
    } catch (err) {}
  };

  return (
    <div className="AuthPage row">
      <div className="col s6 offset-s3">
        <h4 className="AuthPage-Title">Auth Page</h4>
        <div className="AuthPage-Card card blue darken-4">
          <div className="AuthPage-Content card-content white-text">
            <span className="card-title">Authorization</span>
            <div className="input-field">
              <input
                placeholder="Enter a email"
                id="email"
                name="email"
                type="text"
                value={form.email}
                className="AuthPage-Input"
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Enter a password"
                id="password"
                name="password"
                type="password"
                value={form.password}
                className="AuthPage-Input"
                onChange={changeHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="AuthPage-Action card-action">
            <button
              type="button"
              className="AuthPage-Btn btn orange darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
            <button
              type="button"
              className="AuthPage-Btn btn grey lighten-2 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
