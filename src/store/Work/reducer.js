import { 
  GET_WORK,
  GET_WORK_SUCCESS,
  GET_WORK_FAILURE,
  CLOCK_IN_OUT,
  CLOCK_IN_OUT_SUCCESS,
  CLOCK_IN_OUT_FAILURE
} from './types';

export const defaultState = {
  error: null,
  isLoading: false,
  data: null,
  status: -2,
  clockStatus: -2,
  paginator: 0,  
  clockStatus: 0,
};
export const work = (state = defaultState, action) => {
  
  switch (action.type) {
    case GET_WORK:
      return {
        ...state,
        isLoading: true,
        paginator: action.paginator,
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
    case CLOCK_IN_OUT:
      return {
        ...state,
        isLoading: true,        
        status: -2,
      };
    case CLOCK_IN_OUT_SUCCESS: 
      return {
        ...state,        
        isLoading: false,
        clockStatus: action.response.clockStatus
      }
    case CLOCK_IN_OUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        status: -2,
      }    
    default:
      return state;
  }
};
