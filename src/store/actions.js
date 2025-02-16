import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';

export const authStart = () => {
    return {
      type: AUTH_START
    }
  }
  
  export const authSuccess = (token, userId) => {
    return {
      type: AUTH_SUCCESS,
      idToken: token,
      userId: userId
    }
  }
  
  export const authFail = (error) => {
    return {
      type: AUTH_FAIL,
      error: error
    }
  }
  
  export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expireTime')
    localStorage.removeItem('userId')
    return {
      type: LOGOUT
    }
  }
  
  export const checkAuthTime = (expirationTime) => {
    return dispatch => {
      setTimeout(() => {
          dispatch(logout());
      }, expirationTime * 1000);
    }
  }
  
  export const authCheckState = () => {
    return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(logout());
      } else {
        const expirationDate = new Date(localStorage.getItem('expireTime'));
        if (expirationDate > new Date()) {
          const userId = localStorage.getItem('userId');
          dispatch(authSuccess(token, userId));
          dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        } else {
          dispatch(logout());
        }
      }
    }
  }
  
  export const auth = (email , password, isSignUp) => {
    return dispatch => {
      dispatch(authStart());
      const authData = {
        email: email,
        password: password,
        returnSecureToken: true
      };
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAt9LSlyIhcBGwm5J5x6dS3XcmUMB0_OPs'
      if (!isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAt9LSlyIhcBGwm5J5x6dS3XcmUMB0_OPs'
      }
      axios.post(url, authData)
        .then(response => {
          const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.idToken)
          localStorage.setItem('expireTime', expireTime)
          localStorage.setItem('userId', response.data.localId)
          dispatch(authSuccess(response.data.idToken, response.data.localId))
          dispatch(checkAuthTime(response.data.expiresIn))
        })
        .catch(error => {
          console.log(error.response.data.error.message);
          dispatch(authFail(error.response.data.error))
        })
    }
  }