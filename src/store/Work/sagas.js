import { put, all } from 'redux-saga/effects';
import { getWork } from './services';
import { 
  GET_WORK_SUCCESS,
  GET_WORK_FAILURE
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
