import React from 'react';

import { useRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import './App.scss';
import { Nav } from './components/Nav';

function App() {
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <div className="App">
      <Nav isAuthenticated={isAuthenticated} />
      <h1>{routes}</h1>
    </div>
  );
}

export default App;
