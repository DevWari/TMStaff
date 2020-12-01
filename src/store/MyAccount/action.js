import {
    LOAD_PROFILE,
    UPDATE_PROFILE
  } from './types';
  
export function LoadProfileAction(token) {
  console.log ("profile action...", token)
  return {
    type: LOAD_PROFILE,
    token
  };
}
export function UpdateProfileAction(data, token) {
    return {
      type: UPDATE_PROFILE,
      token,
      data
    };
}
    