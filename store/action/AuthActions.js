export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

import AsyncStorage from '@react-native-community/async-storage';

export const authenticate = data => {
  return {type: AUTHENTICATE, data: data};
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

export const signup = user => {
  return async dispatch => {
    try {
      let result = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDapFda3Ujct8SFVY6nsoPisa5ElfZHRLo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          }),
        },
      );

      if (!result.ok) {
        result = await result.json();
        throw new Error(result.error.message);
      }

      result = await result.json();

      dispatch({
        type: REGISTER,
        token: result.idToken,
        email: result.email,
        userId: result.localId,
      });
      const expirationDate = new Date(
        new Date().getTime() + parseInt(result.expiresIn) * 1000,
      ).toISOString();

      saveDataStorage(
        result.idToken,
        result.localId,
        result.email,
        expirationDate,
      );
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Network Error') {
        throw new Error(error.message);
      } else if (error.message === 'EMAIL_EXISTS') {
        throw new Error('email already exists');
      } else if (
        error.message ===
        'WEAK_PASSWORD : Password should be at least 6 characters'
      ) {
        throw new Error('Password should be at least 6 characters');
      } else {
        throw new Error('Something went wrong');
      }
    }
  };
};

export const login = user => {
  return async dispatch => {
    try {
      let result = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDapFda3Ujct8SFVY6nsoPisa5ElfZHRLo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          }),
        },
      );
      if (!result.ok) {
        result = await result.json();
        throw new Error(result.error.message);
      }
      result = await result.json();

      dispatch({
        type: LOGIN,
        token: result.idToken,
        email: result.email,
        userId: result.localId,
      });
      const expirationDate = new Date(
        new Date().getTime() + parseInt(result.expiresIn) * 1000,
      ).toISOString();
      saveDataStorage(
        result.idToken,
        result.localId,
        result.email,
        expirationDate,
      );
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Network Error') {
        throw new Error(error.message);
      } else if (error.message === 'EMAIL_NOT_FOUND') {
        throw new Error('Email not found');
      } else if (error.message === 'INVALID_PASSWORD') {
        throw new Error('Invalid password');
      } else if (error.message === 'USER_DISABLED') {
        throw new Error('Email is blocked');
      } else {
        throw new Error('Something went wrong');
      }
    }
  };
};

const saveDataStorage = (token, userId, email, expirationDate) => {
  console.log('auth data saved to local');
  console.log(token);
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      email: email,
      expirationDate: expirationDate,
    }),
  );
};
