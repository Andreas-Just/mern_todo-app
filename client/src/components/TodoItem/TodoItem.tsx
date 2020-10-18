import React from 'react';
import cn from 'classnames';
import './TodoItem.scss';

type Props = {
  todo: ITodo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    date, time, name, description, isCompleted,
  } = todo;
  const localDate = new Date(date).toLocaleString().split(',')[0];

  return (
    <li className="TodoItem collection-item avatar">
      <i className="TodoItem-Icon material-icons circle blue darken-4">
        assignment
      </i>
      <div className="TodoItem-Header">
        <span className="TodoItem-Date">{localDate}</span>
        &nbsp;&nbsp;&nbsp;
        <span className="TodoItem-Time">{time}</span>
        <p className="TodoItem-Name title">{name}</p>
      </div>
      <p className="TodoItem-Description">{description}</p>
      <p className="TodoItem-CompletedInner">
        Completed:&nbsp;
        <span
          className={cn({
            'TodoItem-Completed': true,
            'TodoItem-Completed_no': !isCompleted,
          })}
        >
          {isCompleted ? 'Yes' : 'No'}
        </span>
      </p>
      <a className="TodoItem-Btn waves-effect waves-teal btn-flat btn-small">
        <i className="material-icons right">cloud</i>
        Details
      </a>
    </li>
  );
};
