import React from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import { Nav } from './components/Nav';
import { Spinner } from './components/Spinner';
import './App.scss';

function App() {
  const { token, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Nav isAuthenticated={isAuthenticated} />
      <div className="App-Main">{routes}</div>
    </div>
  );
}

export default App;
