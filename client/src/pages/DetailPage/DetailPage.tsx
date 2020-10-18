import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks/httpHook';
import { getToken } from '../../store/selectors';
import { Spinner } from '../../components/Spinner';
import { TodoCard } from '../../components/TodoCard';
import './DetailPage.scss';

export const DetailPage = () => {
  const token = useSelector(getToken);
  const { request, loading } = useHttp();
  const [todo, setTodo] = useState(null);
  const { id: todoId } = useParams();

  const getTodo = useCallback(async () => {
    try {
      const fetched = await request(`/api/todo/${todoId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setTodo(fetched);
    } catch (err) {}
  }, [token, todoId, request]);

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="DetailPage row">
      <h4>Detail Page</h4>
      <div className="col s10 m6 l4 offset-s1 offset-m3 offset-l4">
        {!loading && todo && <TodoCard todo={todo} />}
      </div>
    </div>
  );
};
