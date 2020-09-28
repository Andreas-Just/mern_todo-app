import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { TodosPage } from './pages/TodosPage';
import { CreatePage } from './pages/CreatePage';
import { ErrorPage } from './pages/ErrorPage';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todos">
          <TodosPage />
        </Route>

        <Route path="/create">
          <CreatePage />
        </Route>

        <Redirect to="/todos" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login">
        <AuthPage />
      </Route>

      <Route path="/home">
        <HomePage />
      </Route>

      <Redirect from="/" to="/home" />

      <Route path="/error">
        <ErrorPage message="The page is not available" />
      </Route>

      <Redirect from="/*" to="/error" />
    </Switch>
  );
};
