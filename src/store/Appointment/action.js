import {
  GET_ALL_APPOINTMENTS,
  GET_ALL_APPOINTMENTS_DATE,
  GET_ESTIMATE_APPOINTMENTS,
  GET_APPOINTMENT_DETAIL,
  GET_EXTRA_SERVICES,
  ADD_APPOINTMENT,
  CANCEL_APPOINTMENT,
  SET_JOB_BEGIN
} from './types';

export function SetJobBeginAction(data, token) {  
  return {
    type: SET_JOB_BEGIN,  
    token,
    data
  };
}

export function getAllAppointmentsAction(token) {
  
  return {
    type: GET_ALL_APPOINTMENTS,
    token    
  };
}

export function getAllAppointmentsDateAction(data, token) {  
  return {
    type: GET_ALL_APPOINTMENTS_DATE,
    data,
    token    
  };
}

export function getEstimateAppointmentsAction(data, token) {
  return {
    type: GET_ESTIMATE_APPOINTMENTS,
    token,
    data
  };
}

export function getAppointmentDetailAction(data, token) {
  return {
    type: GET_APPOINTMENT_DETAIL,
    token,
    data
  };
}

export function getExtraServicesAction(data, token) {
  return {
    type: GET_EXTRA_SERVICES,
    token,
    data
  };
}

export function addAppointmentAction(data, token) {
  return {
    type: ADD_APPOINTMENT,
    token,
    data
  };
}

export function cancelAppointmentAction(data, token) {
  return {
    type: CANCEL_APPOINTMENT,
    token,
    data
  };
}


