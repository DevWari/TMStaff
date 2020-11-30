import { put, all } from 'redux-saga/effects';
import { getAllCourses, getCourse } from './services';
import { 
  GET_ALL_COURSES_SUCCESS,
  GET_ALL_COURSES_FAILURE,

  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE
} from './types';

export function* getAllCoursesSaga(action) {
    const { token } = action
    let response = null;
    try {
      response = yield getAllCourses(token);
      if (response.status == 1) {
        yield put({ type: GET_ALL_COURSES_SUCCESS, response });
      }
      else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield getAllCourses(token)      
        if (response.status == 1) {        
          yield all([
              put({ type: GET_ALL_COURSES_SUCCESS, response }),
              put(SetTokenAction(token, null)),        	
          ]);     
        }
        else {    
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))    
        removeStorage ()
        navigate ('LoginScreen')
      }
    
    } catch (e) {
      yield put({ type: GET_ALL_COURSES_FAILURE });
    }
 }

 export function* getCourseSaga(action) {
    const { hashedId, token } = action
    let response = null;
    try {
      response = yield getCourse(hashedId, token);
      if (response.status == 1) {
        yield put({ type: GET_COURSE_SUCCESS, response });
      }
      else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield getCourse(hashedId, token)      
        if (response.status == 1) {        
          yield all([
              put({ type: GET_COURSE_SUCCESS, response }),
              put(SetTokenAction(token, null)),        	
          ]);     
        }
        else {    
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate ('LoginScreen')
        }
      }
      else {
        yield put(SetTokenAction(null, null))    
        removeStorage ()
        navigate ('LoginScreen')
      }
    
    } catch (e) {
      yield put({ type: GET_COURSE_FAILURE });
    }
 }