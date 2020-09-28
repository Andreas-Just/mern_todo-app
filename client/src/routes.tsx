import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { AuthPage } from './pages/AuthPage';
import { TodosPage } from './pages/TodosPage';

type Props = RouteComponentProps<{}>;

export const useRoutes: React.FC<Props> = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todos" exact>
          <TodosPage />
        </Route>

        <Redirect to="/todos" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};
