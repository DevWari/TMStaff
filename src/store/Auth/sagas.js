import { put, all } from 'redux-saga/effects';
import { login, getUser, logout, forgotPassword } from './services';
import { 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,  
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,  
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_TOKEN_SUCCESS,
  SET_TOKEN_FAILURE
} from './types';

export function* loginSaga(action) {
  const { email, password } = action;
  try {
    const response = yield login(email, password);  
    console.log ("response...", response)  
    const user = yield getUser(response.token);
    console.log ("user....", user)
    const data = {  
      token: response.token,
      user: user.data.user,      
      status: response.status,
    }     
     yield put({ type: LOGIN_SUCCESS, data });    
  } catch (e) {    
    yield put({ type: LOGIN_FAILURE });
  }
}

export function* setTokenSaga(action) {
  console.log ("Set Token Saga......", action)
  const {token, user} = action
  try {
    const data = {
      token: token,
      user: user
    }
    yield put({ type: SET_TOKEN_SUCCESS, data });
  } catch (e) {
    yield put({ type: SET_TOKEN_FAILURE });
  } 
}
export function* logoutSaga(action) {
  const {token} = action;
  try {
    const response = yield logout(token);
     yield put({ type: LOG_OUT_SUCCESS, response });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: LOG_OUT_FAILURE });
  }
}

export function* forgotPasswordSaga(action) {
  const {email} = action;
  try {
    const response = yield forgotPassword(email);
    console.log ("response....", response)
     yield put({ type: FORGOT_PASSWORD_SUCCESS, response });
    //return navigate('CheckInHome');
  } catch (e) {
    yield put({ type: FORGOT_PASSWORD_FAILURE });
  }
}
