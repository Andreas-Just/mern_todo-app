import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReady, getToken, getUserId } from '../store/selectors';
import { setToken } from '../store/token';
import { setReady } from '../store/ready';
import { setUserId } from '../store/userId';
import { STORAGE_NAME } from '../constants/localStorage';

export const useAuth = () => {
  const token = useSelector(getToken);
  const ready = useSelector(getReady);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const login = useCallback((jwtToken, id) => {
    dispatch(setToken(jwtToken));
    dispatch(setUserId(id));

    localStorage.setItem(STORAGE_NAME, JSON.stringify({
      token: jwtToken,
      userId: id,
    }));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(setToken(''));
    dispatch(setUserId(''));

    localStorage.removeItem(STORAGE_NAME);
  }, [dispatch]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME)!);

    if (data && data.token) {
      login(data.token, data.userId);
    }

    dispatch(setReady(true));
  }, [login, dispatch]);

  useEffect(() => {
    if (token && ready) {
      setTimeout(() => localStorage.removeItem(STORAGE_NAME), 60 * 60 * 1000);
    }
  }, [token, ready, dispatch]);

  return {
    login, logout, token, userId, ready,
  };
};
