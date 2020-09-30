import React, { forwardRef, ReactNode} from 'react';
import cn from 'classnames';
import './FormFieldCreate.scss';

type Props = {
  children?: ReactNode;
  id: string;
  name: string;
  value: string;
  label: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

type Ref = HTMLInputElement;

export const FormFieldCreate = forwardRef<Ref, Props>(({
  id,
  name,
  value,
  label,
  placeholder,
  onChange,
}, ref) => (
  <div className="FormFieldCreate input-field">
    <input
      id={id}
      ref={ref}
      name={name}
      type="text"
      defaultValue={value}
      placeholder={placeholder}
      className={cn({
        'FormFieldCreate-Input': true,
        'datepicker': name === 'date',
        'timepicker': name === 'time',
      })}
      onSelect={onChange}
    />
    <label htmlFor={name}>{label}</label>
  </div>
));

