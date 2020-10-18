import { RootState } from './index';

/**
 * Selectors - a function receiving Redux state and returning some data from it
 */
export const getReady = (state: RootState) => state.ready;
export const getToken = (state: RootState) => state.token;
export const getUserId = (state: RootState) => state.userId;
export const getTodos = (state: RootState) => state.todos;
