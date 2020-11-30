import { GET_ALL_COURSES, GET_COURSE, SNED_MARK_COURSE  } from './types';
  
export function GetAllCoursesAction(token) {
  return {
    type: GET_ALL_COURSES,
    token,    
  };
}

export function GetCourseAction(hashedId, token) {    
  return {
    type: GET_COURSE,
    hashedId,
    token,    
  };
}

export function SendMarkCourseAction(hashedId, token) {    
  return {
    type: SNED_MARK_COURSE,
    hashedId,
    token,    
  };
}
  