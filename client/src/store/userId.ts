import { Action } from 'redux';
import { SET_USER_ID } from '../constants/actionTypes';

type UserIdAction = Action<typeof SET_USER_ID> & {
  id: string;
};

export const setUserId = (id: string): UserIdAction => ({
  type: SET_USER_ID,
  id,
});

const reduce = (userId = '', { type, id }: UserIdAction): string => {
  switch (type) {
    case SET_USER_ID:
      return id;
    default:
      return userId;
  }
};

export default reduce;
