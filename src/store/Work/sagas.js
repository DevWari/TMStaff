import { put, all } from 'redux-saga/effects';
import { getWork, setClockInOut } from './services';
import { 
  GET_WORK_SUCCESS,
  GET_WORK_FAILURE,
  CLOCK_IN_OUT_FAILURE,
  CLOCK_IN_OUT_SUCCESS
} from './types';

export function* getWorkSaga(action) {
    const { token } = action
    try {
      const response = yield getWork(token);
      console.log ("work resspone....", response)
      yield put({ type: GET_WORK_SUCCESS, response });
           
    } catch (e) {
      yield put({ type: GET_WORK_FAILURE });
    }
}

export function* setClockInOutSaga(action) {
    const { token } = action
    try {
      const response = yield setClockInOut(token);
      console.log ("clock resspone....", response)
      yield put({ type: CLOCK_IN_OUT_SUCCESS, response });
           
    } catch (e) {
      yield put({ type: CLOCK_IN_OUT_FAILURE });
    }
}