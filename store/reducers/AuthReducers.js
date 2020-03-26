const initialState = {
  token: null,
  userId: null,
  email: null,
};

import {LOGIN, REGISTER, AUTHENTICATE, LOGOUT} from '../action/AuthActions';

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let authState = {...state};
      authState.token = action.token;
      authState.userId = action.userId;
      authState.email = action.email;
      return {...authState};
    case REGISTER:
      authState = {...state};
      authState.token = action.token;
      authState.userId = action.userId;
      authState.email = action.email;
      return {...authState};
    case AUTHENTICATE:
      authState = {...state};
      authState.token = action.data.token;
      authState.userId = action.data.userId;
      authState.email = action.data.email;
      return {...authState};
    case LOGOUT:
      authState = {...state};
      authState.token = null;
      authState.userId = null;
      authState.email = null;
      return {...authState};
    default:
      state;
  }
  return {...state};
};

export default authReducer;
