import {
  GET_WORK,
  CLOCK_IN_OUT
} from './types';

export function GetWorkAction(paginator, token) {  
  return {
    type: GET_WORK,  
    paginator,
    token,    
  };
}

export function SetClockInOutAction(token) {
  return {
    type: CLOCK_IN_OUT,  
    token,
  };
}
