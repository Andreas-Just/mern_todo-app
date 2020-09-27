import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, {
  setError, finishLoading, startLoading, setLoaded,
} from './loading';
import flightsReducer, { initFlights } from './flights';
import { getFlights } from '../helpers/api';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 */
const rootReducer = combineReducers({
  loading: loadingReducer,
  flights: flightsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

/**
 * Thunk - is a function that should be used as a normal action creator dispatch(loadFlights())
 */
export const loadFlights = () => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const flights = await getFlights();

      dispatch(initFlights(flights));
      dispatch(setLoaded());
    } catch (error) {
      dispatch(setError(error.message));
    }

    dispatch(finishLoading());
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
