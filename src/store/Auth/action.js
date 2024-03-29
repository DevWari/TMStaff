import {
    LOGIN,
    LOG_OUT,    
    FORGOT_PASSWORD,
    SET_TOKEN
  } from './types';
  
export function LoginAction(email, password) {
  return {
    type: LOGIN,
    email,
    password
  };
}

export function SetTokenAction(token, user) {  
  console.log ("set token action...")
  return {
    type: SET_TOKEN,
    token,
    user
  };
}
export function LogoutAction(token) {
  return {
    type: LOG_OUT,
    token,
  };
}

export function ForgotPasswordAction(email) {
  return {
    type: FORGOT_PASSWORD,
    email,
  };
}
  