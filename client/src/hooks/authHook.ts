import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getUserId } from '../store/selectors';
import { setToken } from '../store/token'
import { setUserId } from '../store/userId';

const storageName = 'userData';

export const useAuth = () => {
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const login = useCallback((jwtToken, id) => {
    dispatch(setToken(jwtToken));
    dispatch(setUserId(id));

    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken,
      userId: id,
    }));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(setToken(''));
    dispatch(setUserId(''));

    localStorage.removeItem(storageName);
  }, [dispatch]);

  useEffect(() => {
    const  data = JSON.parse(localStorage.getItem(storageName)!);

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
