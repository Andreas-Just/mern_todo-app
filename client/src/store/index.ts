import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import readyReducer from './ready';
import tokenReducer from './token';
import userIdReducer from './userId';
import todosReducer from './todos';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 */
const rootReducer = combineReducers({
  ready: readyReducer,
  token: tokenReducer,
  userId: userIdReducer,
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/**
 * Thunk - is a function that should be used as a normal action creator dispatch(loadFlights())
 */

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
