import { 
    GET_ALL_COURSES,
    GET_ALL_COURSES_SUCCESS,
    GET_ALL_COURSES_FAILURE,

    GET_COURSE,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAILURE
  } from './types';
  
  export const defaultState = {    
    isLoading: false,
    data: null,
    courseData: null,
    status: -2,
  };
  export const courses = (state = defaultState, action) => {
    switch (action.type) {         
      case GET_ALL_COURSES: 
        return {
          ...state,
          isLoading: true,
          status: -2,
        }
      case GET_ALL_COURSES_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.response.data,
          status: 1,
        }; 
      case GET_ALL_COURSES_FAILURE: 
        return {
          ...state,
          isLoading: false,
          status: -1,
      }    
      case GET_COURSE: 
        return {
          ...state,
          isLoading: true,
          status: -2,
        }
      case GET_COURSE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          courseData: action.response.data,
          status: 1,
        }; 
      case GET_COURSE_FAILURE: 
        return {
          ...state,
          isLoading: false,
          status: -1,
      }       
      default:
        return state;
    }
  };
  