import React from 'react';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: ITodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {!todos.length
        ? <p>No todos yet</p>
        : (
          <ul className="TodoList collection">
            {todos.map(todo => <TodoItem key={todo._id} todo={todo} />)}
          </ul>
        )}
    </>
  );
};
