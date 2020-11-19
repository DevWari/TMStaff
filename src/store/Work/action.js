import {
  GET_WORK,
  CLOCK_IN_OUT
} from './types';

export function GetWorkAction(token) {
  return {
    type: GET_WORK,  
    token,
  };
}

export function SetClockInOut(token) {
  return {
    type: CLOCK_IN_OUT,  
    token,
  };
}

