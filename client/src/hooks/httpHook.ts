import { useState, useCallback } from 'react';
import { STORAGE_NAME } from '../constants/localStorage';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          if (data.message === 'No authorization') {
            localStorage.removeItem(STORAGE_NAME)
          }
          throw data.message || new Error('Something went wrong');
        }

        setLoading(false);

        return data;
      } catch (err) {
        setLoading(false);
        setError(err);
        throw err;
      }
    }, []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError }
}
