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
/* Sagas */

import { loginSaga, logoutSaga, forgotPasswordSaga, setTokenSaga } from './Auth/sagas';
import { loadProfileSaga, upadteProfileSaga } from './MyAccount/sagas';
import { sendContactSaga } from './Contact/sagas';

/* Actions    */
import { LOGIN, LOG_OUT, FORGOT_PASSWORD, SET_TOKEN } from './Auth/types';
import { LOAD_PROFILE, UPDATE_PROFILE } from './MyAccount/types';
import { SEND_CONTACT } from './Contact/types';

const rootReducer = combineReducers({
  auth,  
  account,
  contact,
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
