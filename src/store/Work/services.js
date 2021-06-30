import { API_URL } from 'src/utils/config';

export const getWork = (paginator, token) => {    
    const url = API_URL + `hour-list?paginator=${paginator}`;    
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`, 
      }      
    })    
    .then((response) => response.json())
    .then((responseJson) => {      
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};

export const setClockInOut = (token) => {    
    const url = API_URL + "set-start-stop";      
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`, 
      }      
    })
    .then((response) => response.json())
    .then((responseJson) => {  
      console.log ("aaaaa....", responseJson)    
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};


export const getClockStatus = (token) => {    
  const url = API_URL + "get-clock-status";    
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`, 
    }      
  })
  .then((response) => response.json())
  .then((responseJson) => {       
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};
