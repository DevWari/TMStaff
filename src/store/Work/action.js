import {
  GET_WORK  
} from './types';

export function GetWorkAction(data, token) {
return {
  type: GET_WORK,
  data,
  token,
};
}

