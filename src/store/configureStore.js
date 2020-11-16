/*******
 * configureStore
 * Set up and configure store, reducers and epics
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, all } from 'redux-saga/effects';

/* Reducers */

import { auth } from './Auth/reducer';

/* Sagas */

import { loginSaga, registerSaga, logoutSaga, forgotPasswordSaga, setTokenSaga } from './Auth/sagas';

/* Actions    */
import { LOGIN, REGISTER, LOG_OUT, FORGOT_PASSWORD, SET_TOKEN } from './Auth/types';

const rootReducer = combineReducers({
  auth,  
});

const sagaMiddleware = createSagaMiddleware();

function* watchAll() {
  yield all([
    takeEvery(LOGIN, loginSaga),
    takeEvery(REGISTER, registerSaga),
    takeEvery(LOG_OUT, logoutSaga),    
    takeEvery(FORGOT_PASSWORD, forgotPasswordSaga),    
    takeEvery(SET_TOKEN, setTokenSaga),
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
