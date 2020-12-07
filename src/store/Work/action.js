import {
  GET_WORK,
  CLOCK_IN_OUT,
  GET_CLOCK_STATUS
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

export function GetClockStatusAction(token) {
  return {
    type: GET_CLOCK_STATUS,  
    token,
  };
}
