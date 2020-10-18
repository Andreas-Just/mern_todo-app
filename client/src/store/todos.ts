import { Action } from 'redux';
import { SET_TODOS, DELETE_TODO } from '../constants/actionTypes';

type SetTodosAction = Action<typeof SET_TODOS> & {
  todos: ITodo[];
};
type DeleteTodosAction = Action<typeof DELETE_TODO> & {
  todoId: number;
};

export const setTodos = (todos: ITodo[]): SetTodosAction => ({
  type: SET_TODOS,
  todos,
});

export const deleteTodo = (todoId: number): DeleteTodosAction => ({
  type: DELETE_TODO,
  todoId,
});

type TodosAction = SetTodosAction | DeleteTodosAction;

const reduce = (todos: ITodo[] = [], action: TodosAction): ITodo[] => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;
    case DELETE_TODO:
      return todos.filter(todo => action.todoId !== todo.id);
    default:
      return todos;
  }
};

export default reduce;
