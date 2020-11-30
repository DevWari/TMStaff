/*******
 * configureStore
 * Set up and configure store, reducers and epics
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, all } from 'redux-saga/effects';

/* Reducers */

import { auth } from './Auth/reducer';
import { account } from './MyAccount/reducer';
import { contact } from './Contact/reducer';
import { work } from './Work/reducer';
import { appointment } from './Appointment/reducer';
import { courses } from './Courses/reducer';
/* Sagas */

import { loginSaga, logoutSaga, forgotPasswordSaga, setTokenSaga } from './Auth/sagas';
import { loadProfileSaga, upadteProfileSaga } from './MyAccount/sagas';
import { sendContactSaga } from './Contact/sagas';
import { getWorkSaga, setClockInOutSaga } from './Work/sagas';
import { getAllCoursesSaga, getCourseSaga, sendMarkCourseSaga } from './Courses/sagas';

import {
  getAllAppointmentsSaga,
  getEstimateAppointmentsSaga,
  getAppointmentDetailSaga,
  getExtraServicesSaga,
  addAppointmentSaga,
  cancelAppointmentSaga,
  getAllAppointmentsDateSaga
} from './Appointment/sagas';

/* Actions    */
import { LOGIN, LOG_OUT, FORGOT_PASSWORD, SET_TOKEN } from './Auth/types';
import { LOAD_PROFILE, UPDATE_PROFILE } from './MyAccount/types';
import { SEND_CONTACT } from './Contact/types';
import { GET_WORK, CLOCK_IN_OUT } from './Work/types';

import {
  GET_ALL_APPOINTMENTS,
  GET_ESTIMATE_APPOINTMENTS,
  GET_APPOINTMENT_DETAIL,
  GET_EXTRA_SERVICES,
  ADD_APPOINTMENT,
  CANCEL_APPOINTMENT,
  GET_ALL_APPOINTMENTS_DATE
} from './Appointment/types';
import { GET_ALL_COURSES, GET_COURSE, SNED_MARK_COURSE } from './Courses/types';

const rootReducer = combineReducers({
  auth,  
  account,
  contact,
  work,
  appointment,
  courses
});

const sagaMiddleware = createSagaMiddleware();

function* watchAll() {
  yield all([
    takeEvery(LOGIN, loginSaga),    
    takeEvery(LOG_OUT, logoutSaga),    
    takeEvery(FORGOT_PASSWORD, forgotPasswordSaga),    
    takeEvery(SET_TOKEN, setTokenSaga),
    takeEvery(LOAD_PROFILE, loadProfileSaga),
    takeEvery(UPDATE_PROFILE, upadteProfileSaga),
    takeEvery(SEND_CONTACT, sendContactSaga),
    takeEvery(GET_WORK, getWorkSaga),
    takeEvery(CLOCK_IN_OUT, setClockInOutSaga),

    takeEvery(GET_ALL_APPOINTMENTS, getAllAppointmentsSaga),
    takeEvery(GET_ALL_APPOINTMENTS_DATE, getAllAppointmentsDateSaga),
    takeEvery(GET_ESTIMATE_APPOINTMENTS, getEstimateAppointmentsSaga),
    takeEvery(GET_APPOINTMENT_DETAIL, getAppointmentDetailSaga),
    takeEvery(GET_EXTRA_SERVICES, getExtraServicesSaga),
    takeEvery(ADD_APPOINTMENT, addAppointmentSaga),
    takeEvery(CANCEL_APPOINTMENT, cancelAppointmentSaga),
    takeEvery(GET_ALL_COURSES, getAllCoursesSaga),
    takeEvery(GET_COURSE, getCourseSaga),
    takeEvery(SNED_MARK_COURSE, sendMarkCourseSaga),
  ]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(watchAll);
  return store;
};
