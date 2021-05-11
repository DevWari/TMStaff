import { put, all } from 'redux-saga/effects';
import { getWork, setClockInOut, getClockStatus } from './services';
import { 
  GET_WORK_SUCCESS,
  GET_WORK_FAILURE,
  CLOCK_IN_OUT_FAILURE,
  CLOCK_IN_OUT_SUCCESS,
  GET_CLOCK_STATUS_SUCCESS,
  GET_CLOCK_STATUS_FAILURE,
} from './types';
import { SetTokenAction } from 'src/store/Auth/action'
import {removeStorage, replaceToken} from 'src/utils/global'
import { navigate } from 'src/utils/navigation'

export function* getWorkSaga(action) {
    const { token, paginator } = action    
    let response = null;
    try {
      response = yield getWork(paginator, token);
      console.log ("work saga....", response)
      if (response.status == 1) {
        yield put({ type: GET_WORK_SUCCESS, response });
      } else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield getWork(paginator,token)      
        if (response.status == 1) {        
          yield all([
            put({ type: GET_WORK_SUCCESS, response }),
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
      yield put({ type: GET_WORK_FAILURE });
    }
}

export function* setClockInOutSaga(action) {
    const { token } = action    
    let response = null;
    try {
      response = yield setClockInOut(token);    
      console.log ("response...clock", response)  
      if (response.status == 1) {
        yield put({ type: CLOCK_IN_OUT_SUCCESS, response });
      } else if (response.status == 2) {
        let token = response.token
        replaceToken (token)
        response = yield setClockInOut(token)  
        console.log ("response...clock", response)      
        if (response.status == 1) {        
          yield all([
            put({ type: CLOCK_IN_OUT_SUCCESS, response }),
            put(SetTokenAction(token, null)),        	
          ]);     
        }
        else {    
          yield put(SetTokenAction(null, null))    
          removeStorage ()
          navigate ('LoginScreen')
        }
      } else {
        yield put(SetTokenAction(null, null))    
        removeStorage ()
        navigate ('LoginScreen')
      }
      
    } catch (e) {
      yield put({ type: CLOCK_IN_OUT_FAILURE });
    }
}

export function* getClockStatusSaga(action) {
  const { token } = action    
  let response = null;
  try {
    response = yield getClockStatus(token);        
    if (response.status == 1) {
      yield put({ type: GET_CLOCK_STATUS_SUCCESS, response });
    } else if (response.status == 2) {
      let token = response.token
      replaceToken (token)
      response = yield getClockStatus(token)        
      if (response.status == 1) {        
        yield all([
          put({ type: GET_CLOCK_STATUS_SUCCESS, response }),
          put(SetTokenAction(token, null)),        	
        ]);     
      }
      else {            
        removeStorage ()
        navigate ('LoginScreen')
      }
    } else {      
      removeStorage ()
      navigate ('LoginScreen')
    }
    
  } catch (e) {
    yield put({ type: GET_CLOCK_STATUS_FAILURE });
  }
}