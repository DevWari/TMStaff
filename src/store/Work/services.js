import { API_URL } from 'src/utils/config';

export const getWork = (paginator, token) => {
    console.log ("work services   token...", token)
    const url = API_URL + `hour-list?paginator=${paginator}`;
    console.log ("url...", url)
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
    console.log ("url...", url)
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


