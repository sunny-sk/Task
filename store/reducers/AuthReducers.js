const initialState = {
  data: {},
  loggedIn: false,
};

import {
  ALREADY_LOGIN,
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
} from '../action/AuthActions';

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let newState = {...state};

      return {...newState};
    case REGISTER:
      newState = {...state};

      newState.tasks.push({...action.task});
      return {...newState};
    case FORGOT_PASSWORD:
      newState = {...state};

      // newState.tasks.splice(foundIndex, 1);
      return {...newState};
    case ALREADY_LOGIN:
      return {...state};
    default:
      state;
  }
  return {...state};
};

export default authReducer;
