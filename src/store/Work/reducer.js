import { 
  GET_WORK,
  GET_WORK_SUCCESS,
  GET_WORK_FAILURE
} from './types';

export const defaultState = {
  error: null,
  isLoading: false,
  data: null,
  status: -2,
};
export const work = (state = defaultState, action) => {
  
  switch (action.type) {
    case GET_WORK:
      return {
        ...state,
        isLoading: true,
        status: -2,
      };
    case GET_WORK_SUCCESS: 
      return {
        ...state,
        data: action.response.data,
        isLoading: false
      }
    case GET_WORK_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: -2,
      }    
    default:
      return state;
  }
};
