import { Action } from 'redux';
import { SET_TOKEN } from '../constants/actionTypes';

type TokenAction = Action<typeof SET_TOKEN> & {
  jwtToken: string;
};

export const setToken = (jwtToken: string): TokenAction => ({
  type: SET_TOKEN,
  jwtToken,
});

const reduce = (token: string = '', { type, jwtToken }: TokenAction): string => {
  switch (type) {
    case SET_TOKEN:
      return jwtToken;
    default:
      return token;
  }
};

export default reduce;
