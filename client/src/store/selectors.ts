import { RootState } from './index';

/**
 * Selectors - a function receiving Redux state and returning some data from it
 */
export const getLoading = (state: RootState) => state.loading.loading;
export const getLoaded = (state: RootState) => state.loading.loaded;
export const getError = (state: RootState) => state.loading.error;
export const getToken = (state: RootState) => state.token;
export const getUserId = (state: RootState) => state.userId;
