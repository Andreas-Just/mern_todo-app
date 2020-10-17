import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getUserId } from '../store/selectors';
import { setToken } from '../store/token'
import { setUserId } from '../store/userId';
import { STORAGE_NAME } from '../constants/localStorage';

export const useAuth = () => {
  const token = useSelector(getToken) || false;
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
    const  data = JSON.parse(localStorage.getItem(STORAGE_NAME)!);

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  useEffect(() => {
    if (token && typeof token === 'string') {
      console.log('start')
      setTimeout(() => localStorage.removeItem(STORAGE_NAME), 60 * 60 * 1000);
    }
  }, [token]);

  console.log(!!token, typeof token);

  return { login, logout, token, userId };
};
