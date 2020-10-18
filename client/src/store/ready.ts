import { Action } from 'redux';
import { SET_READY } from '../constants/actionTypes';

type SetReadyAction = Action<typeof SET_READY> & {
  bool: boolean;
};

export const setReady = (bool: boolean): SetReadyAction => ({
  type: SET_READY,
  bool,
});

const reduce = (ready = false, { type, bool }: SetReadyAction): boolean => {
  switch (type) {
    case SET_READY:
      return bool;
    default:
      return ready;
  }
};

export default reduce;
