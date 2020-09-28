import React from 'react';

type Props = {
  message: string;
};

export const ErrorPage: React.FC<Props> = ({ message }) => <h2>{message}</h2>;

