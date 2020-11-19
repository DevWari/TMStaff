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

export function SetClockInOutAction(token) {
  return {
    type: CLOCK_IN_OUT,  
    token,
  };
}

