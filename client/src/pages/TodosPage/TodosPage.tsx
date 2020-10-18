import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getToken } from '../../store/selectors';
import { useHttp } from '../../hooks/httpHook';
import { setTodos } from '../../store/todos';
import { Spinner } from '../../components/Spinner';
import { TodoList } from '../../components/TodoList';

export const TodosPage = () => {
  const todos = useSelector(getTodos);
  const token = useSelector(getToken);
  const { request, loading } = useHttp();
  const dispatch = useDispatch();

  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request('/api/todo', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      dispatch(setTodos(fetched));
    } catch (err) {}
  }, [token, request, dispatch]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h4>List Todos</h4>
      {!loading && <TodoList todos={todos} />}
    </>
  );
};
