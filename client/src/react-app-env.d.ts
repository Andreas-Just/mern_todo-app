// eslint-disable-next-line
/// <reference types="react-scripts" />
interface ITodo {
  [key: string]: T;
  _id: string;
  isCompleted: boolean;
  owner: string[];
  name: string;
  description: string;
  date: any;
  time: string;
}
