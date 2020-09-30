import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useHttp } from '../../hooks/httpHook';
import { FormFieldCreate } from '../../components/FormFieldCreate';
import './CreatePage.scss';

type NewTaskValues = {
  date: string;
  time: string;
  name: string;
  description: string;
};

interface IFieldConfig {
  name: keyof NewTaskValues;
  label: string;
  placeholder: string;
}

const fieldConfigs: IFieldConfig[] = [
  {
    name: 'date',
    label: 'Date',
    placeholder: 'Select date in day-month-year format',
  },
  {
    name: 'time',
    label: 'Time',
    placeholder: 'Select the time in 24-hour format',
  },
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Insert the task name',
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Insert the task description',
  },
];

const defaultValues: NewTaskValues = {
  date: '',
  time: '',
  name: '',
  description: '',
};

export const CreatePage = () => {
  const { loading } = useHttp();
  const [task, setTask] = useState(defaultValues);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    window.M.updateTextFields();
    window.M.AutoInit();
  }, []);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'time') {
      const elem = timeRef.current;
      M.Timepicker.init(elem!, { twelveHour: false });
    }

    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const dateHandler = () => {
    const elem = dateRef.current;
    M.Datepicker.init(elem!, {
      defaultDate: new Date(),
      format: 'dd/mm/yyyy',
      onSelect: (value: any) => {
        const date = value.toLocaleString('en-GB').split(',')[0];
        setTask({ ...task, date })
      },
    });
  };

  const createHandler = () => {

  };
  console.log(task);
  return (
    <div className="CreatePage row">
      <h2>Create Page</h2>
      <div className="CreatePage-Form col s8 offset-s2 card blue-grey lighten-5">
        <div className="CreatePage-Content card-content">
          <span className="card-title">Create Task</span>
          {fieldConfigs.map(({ name, label, placeholder }) => (
            <FormFieldCreate
              ref={name === 'date' ? dateRef : name === 'time' ? timeRef : null}
              key={name}
              id={name}
              name={name}
              label={label}
              placeholder={placeholder}
              value={task[name]}
              onChange={name === 'date' ? dateHandler : changeHandler}
            />
          ))}
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
