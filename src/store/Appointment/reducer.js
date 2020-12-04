import {
  GET_ALL_APPOINTMENTS,
  GET_ALL_APPOINTMENTS_SUCCESS,
  GET_ALL_APPOINTMENTS_FAILURE,

  GET_ESTIMATE_APPOINTMENTS,
  GET_ESTIMATE_APPOINTMENTS_SUCCESS,
  GET_ESTIMATE_APPOINTMENTS_FAILURE,

  GET_APPOINTMENT_DETAIL,
  GET_APPOINTMENT_DETAIL_SUCCESS,
  GET_APPOINTMENT_DETAIL_FAILURE,

  GET_EXTRA_SERVICES,
  GET_EXTRA_SERVICES_SUCCESS,
  GET_EXTRA_SERVICES_FAILURE,

  ADD_APPOINTMENT,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAILURE,
  
  CANCEL_APPOINTMENT,
  CANCEL_APPOINTMENT_SUCCESS,
  CANCEL_APPOINTMENT_FAILURE,

  GET_ALL_APPOINTMENTS_DATE,
  GET_ALL_APPOINTMENTS_DATE_SUCCESS,
  GET_ALL_APPOINTMENTS_DATE_FAILURE,

  SET_JOB_BEGIN,
  SET_JOB_BEGIN_SUCCESS,
  SET_JOB_BEGIN_FAILURE

} from './types';

export const defaultState = {
  appointments: [],
  appointment: null,
  extraServices: [],
  message: null,
  isLoading: false,
  status: -2,
  clockStatus: 0,
};

export const appointment = (state = defaultState, action) => {
  switch (action.type) {

    case SET_JOB_BEGIN:
      return {
        ...state,       
        isLoading: false,
        status: -2,
      };
    case SET_JOB_BEGIN_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        status: 1,
        clockStatus: action.response.clockStatus
    }
    case SET_JOB_BEGIN_FAILURE:
      return {
        ...state,
        status: -2,
        isLoading: true,
      };
    case GET_ALL_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.response?.data?.jobs,
        status: 1,
        isLoading: false
      };
    case GET_ALL_APPOINTMENTS_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case GET_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: [],
        status: -2,
        isLoading: true,
      };
    case GET_ALL_APPOINTMENTS_DATE_SUCCESS:
      return {
        ...state,
        appointments: action.response?.data?.jobs,
        status: 1,
        isLoading: false
      };
    case GET_ALL_APPOINTMENTS_DATE_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case GET_ALL_APPOINTMENTS_DATE:
      return {
        ...state,
        appointments: [],
        status: -2,
        isLoading: true,
      };
    case GET_ESTIMATE_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.response?.jobs,
        status: 1,
        isLoading: false
      };
    case GET_ESTIMATE_APPOINTMENTS_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case GET_ESTIMATE_APPOINTMENTS:
      return {
        ...state,
        appointments: [],
        status: -2,
        isLoading: true,
      };
    case GET_APPOINTMENT_DETAIL_SUCCESS:
      return {
        ...state,
        appointment: action.response,
        status: 1,
        isLoading: false
      };
    case GET_APPOINTMENT_DETAIL_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case GET_APPOINTMENT_DETAIL:
      return {
        ...state,
        appointment: null,
        status: -2,
        isLoading: true,
      };
    case GET_EXTRA_SERVICES_SUCCESS:
      return {
        ...state,
        extraServices: action.response,
        status: 1,
        isLoading: false
      };
    case GET_EXTRA_SERVICES_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case GET_EXTRA_SERVICES:
      return {
        ...state,
        extraServices: [],
        status: -2,
        isLoading: true,
      };
    case ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        // status: action.response.status,
        status: 200,
        isLoading: false
      };
    case ADD_APPOINTMENT_FAILURE: 
      return {
        ...state,
        isLoading: false,
        status: -2,
    }
    case ADD_APPOINTMENT:
      return {
        ...state,
        status: -2,
        isLoading: true,
      };
    case CANCEL_APPOINTMENT_SUCCESS:
      return {
        ...state,
        message: action.response?.message,
        status: 200,
        isLoading: false
      };
    case CANCEL_APPOINTMENT_FAILURE: 
      return {
        ...state,
        message: null,
        isLoading: false,
        status: -2,
    }
    case CANCEL_APPOINTMENT:
      return {
        ...state,
        message: null,
        status: -2,
        isLoading: true,
      };
      
    default:
      return state;
  }
};
