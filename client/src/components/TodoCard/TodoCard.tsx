import React from 'react';
import cn from 'classnames';
import './TodoCard.scss';

type Props = {
  todo: ITodo | null;
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  if (!todo) {
    return null;
  }

  const {
    date, time, name, description, isCompleted,
  } = todo;
  const localDate = new Date(date).toLocaleString().split(',')[0];

  return (
    <div className="TodoCard card blue-grey lighten-5">
      <div className="TodoCard-Content card-content">
        <div className="TodoCard-Date card-title">{localDate}</div>
        <div className="TodoCard-Time card-title">{time}</div>
        <div className="TodoCard-Title card-title">{name}</div>
        <p className="TodoCard-Text">{description}</p>
        <p className="TodoCard-Text">
          Completed:&nbsp;
          <span
            className={cn({
              'TodoCard-Completed': true,
              'TodoCard-Completed_no': !isCompleted,
            })}
          >
            {isCompleted ? 'Yes' : 'No'}
          </span>
        </p>
      </div>
      <div className="TodoCard-Action card-action">
        <a href="#">Edit</a>
        <a href="#">Delete</a>
      </div>
    </div>
  );
};
