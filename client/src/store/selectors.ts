import { RootState } from './index';

/**
 * Selectors - a function receiving Redux state and returning some data from it
 */
export const getLoading = (state: RootState) => state.loading.loading;
export const getLoaded = (state: RootState) => state.loading.loaded;
export const getError = (state: RootState) => state.loading.error;
export const getFlightsAll = (state: RootState) => state.flights;
