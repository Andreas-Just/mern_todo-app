import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import './CreatePage.scss';
import { useHttp } from '../../hooks/httpHook';

export const CreatePage = () => {
  const { loading } = useHttp();
  const [todo, setTodo] = useState({
    name: '', description: '', date: '', time: '',
  });

  useEffect(() => {
    window.M.updateTextFields();
    window.M.AutoInit();
  }, []);
  const timeInput = useRef(null);
  const dateInput = useRef(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'time') {
      const elem = timeInput.current;
      M.Timepicker.init(elem!, { twelveHour: false });
    }

    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const dateHandler = () => {
    const elem = dateInput.current;
    M.Datepicker.init(elem!, {
      defaultDate: new Date(),
      format: 'dd/mm/yyyy',
      onSelect: (value: any) => {
        const date = value.toLocaleString('en-GB').split(',')[0];
        setTodo({ ...todo, date })
      },
    });
  };

  const createHandler = () => {

  };
console.log(todo);
  return (
    <div className="CreatePage row">
      <h2>Create Page</h2>
      <div className="CreatePage-Form col s8 offset-s2 card blue-grey lighten-5">
        <div className="CreatePage-Content card-content">
          <span className="card-title">Create Task</span>
          <div className="input-field">
            <input
              placeholder="Select date in day-month-year format"
              id="date"
              name="date"
              type="text"
              ref={dateInput}
              defaultValue={todo.date}
              className="CreatePage-Input datepicker"
              onSelect={dateHandler}
            />
            <label htmlFor="date">Date</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Select the time in 24-hour format"
              id="time"
              name="time"
              type="text"
              ref={timeInput}
              defaultValue={todo.time}
              className="CreatePage-Input timepicker"
              onSelect={changeHandler}
            />
            <label htmlFor="time">Time</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Insert the task name"
              id="name"
              name="name"
              type="text"
              value={todo.name}
              className="CreatePage-Input"
              onChange={changeHandler}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input
              placeholder="Insert the task description"
              id="description"
              name="description"
              type="text"
              value={todo.description}
              className="CreatePage-Input"
              onChange={changeHandler}
            />
            <label htmlFor="description">Description</label>
          </div>
        </div>
        <div className="CreatePage-Action card-action">
          <button
            className="CreatePage-Btn btn blue darken-4"
            onClick={createHandler}
            disabled={loading}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
