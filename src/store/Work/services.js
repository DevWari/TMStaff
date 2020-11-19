import { API_URL } from 'src/utils/config';

export const getWork = (data, token) => {
    const url = API_URL + "contact-form";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`, 
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((responseJson) => {      
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};




