import { GET_ALL_COURSES, GET_COURSE  } from './types';
  
export function GetAllCoursesAction(token) {
  return {
    type: GET_ALL_COURSES,
    token,    
  };
}

export function GetCourseAction(hashedId, token) {
    return {
      type: GET_ALL_COURSES,
      hashedId,
      token,    
    };
  }
  