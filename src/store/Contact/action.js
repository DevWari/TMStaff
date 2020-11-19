import {
    SEND_CONTACT,
    INIT_CONTACT_STATUS
} from './types';
  
export function SendContactAction(data) {

  console.log ("contact action...", data)
  return {
    type: SEND_CONTACT,
    data,
  };
}

export function InitStatustAction() {
  return {
    type: INIT_CONTACT_STATUS,
    data: []
  };
}
