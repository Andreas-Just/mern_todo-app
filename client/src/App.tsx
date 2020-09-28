import React, { useEffect } from 'react';
import { getMovies } from './api/getMovies';

import { useRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import './App.scss';

function App() {
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    getMovies('Star') // .env example
  }, []);

  return (
    <div className="App">
      <h1>{routes}</h1>
    </div>
  );
}

export default App;
