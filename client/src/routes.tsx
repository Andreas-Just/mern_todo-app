import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { TodosPage } from './pages/TodosPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { ErrorPage } from './pages/ErrorPage';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todos" exact>
          <TodosPage />
        </Route>

        <Route path="/create" exact>
          <CreatePage />
        </Route>

        <Route path="/detail/:id">
          <DetailPage />
        </Route>

        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <AuthPage />
      </Route>

      <Route path="/home" exact>
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
