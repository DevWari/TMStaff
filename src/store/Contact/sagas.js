import { put, all } from 'redux-saga/effects';
import { sendContact } from './services';
import { 
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_FAILURE
} from './types';

export function* sendContactSaga(action) {
    const { data } = action
    try {
      const response = yield sendContact(data);
      yield put({ type: SEND_CONTACT_SUCCESS, response });
           
    } catch (e) {
      yield put({ type: SEND_CONTACT_FAILURE });
    }
}
