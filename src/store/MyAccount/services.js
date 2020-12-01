import { API_URL } from 'src/utils/config';

export const loadProfile = (token) => {
  console.log ("load profile....")
  const url = API_URL + "get-user-info";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:  `Bearer ${token}`,
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {    
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const updateProfile = (data, token) => {    
    const url = API_URL + "update-user";
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




