import {
  GET_WORK  
} from './types';

export function GetWorkAction(token) {
return {
  type: GET_WORK,  
  token,
};
}

