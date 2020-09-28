import React, { ChangeEvent, useEffect, useState } from 'react';
import './AuthPage.scss';
import { useHttp } from '../../hooks/httpHooks';
import { useMessage } from '../../hooks/message';

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (err) {}
  };

  return (
    <div className="AuthPage row">
      <div className="col s6 offset-s3">
        <h2>TodoApp Application</h2>
        <div className="AuthPage-Card card blue darken-4">
          <div className="AuthPage-Content card-content white-text">
            <span className="card-title">Authorization</span>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  name="email"
                  type="text"
                  className="AuthPage-Input"
                  onChange={changeHandler}
                  autoComplete="off"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  name="password"
                  type="password"
                  className="AuthPage-Input"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
          </div>
          <div className="AuthPage-Action card-action">
            <button
              className="AuthPage-Btn btn orange darken-4"
              disabled={loading}
            >
              Login
            </button>
            <button
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
