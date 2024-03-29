import { 
    LOGIN, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    LOGOUT,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,    
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    SET_TOKEN,
    SET_TOKEN_SUCCESS,
    SET_TOKEN_FAILURE
  } from './types';
  
  export const defaultState = {
    token: null,
    error: null,
    isLoading: false,
    username: null,
    password: null,
    user: null,
    userName: null,
    loginStatus: -2,
    status: -2,
  };
  export const auth = (state = defaultState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:                 
        return {
          ...state,
          token: action.data.token,
          user: action.data.user,
          userName: action.data.user?.name,
          username: action.email,          
          password: action.password,
          loginStatus: action.data.status,
          isLoading: false
        }; 
      case LOGIN_FAILURE:         
        return {
          ...state,
          token: null,
          user: null,
          name: null,
          loginStatus: -1,
          isLoading: false
      }
      case LOGIN:
        return {
          ...state,
          isLoading: true,
          token: null,
          user: null,
          name: null,
          loginStatus: -2,
        }      
      case LOGOUT: 
        return {
          ...state,
          isLoading: true,
          status: -2,
        }
      case LOG_OUT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          token: null,      
          error: null,    
          username: null,
          password: null,
          user: null,
          userName: null,          
          status: -2,
        }; 
      case LOG_OUT_FAILURE: 
        return {
          ...state,
          isLoading: false,          
      }
      case FORGOT_PASSWORD:
        return {
          ...state,
          token: null,
          isLoading: false
        }; 
      case FORGOT_PASSWORD_SUCCESS: 
        return {
          ...state,
          isLoading: false,
          token: null
      }
      case FORGOT_PASSWORD_FAILURE:
        return {
          ...state,
          isLoading: true,
          token: null,
        }
      case SET_TOKEN: 
        return {
          ...state,
          isLoading: true,          
        }
      case SET_TOKEN_SUCCESS: 
        
        if (action.data.user) {
          return {
            ...state,
            isLoading: false,
            token: action.data.token,
            userName: action.data.user
          }
        }
        else {
          return {
            ...state,
            isLoading: false,
            token: action.data.token,        
          }
        }
        
      case SET_TOKEN_FAILURE:
        return {
          ...state,
          isLoading: true,
          token: null,
        }
      default:
        return state;
    }
  };
  