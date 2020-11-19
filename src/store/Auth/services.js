import { API_URL } from 'src/utils/config';

export const login = (username, password) => {

  console.log ("login.... service...", username)
  const url = API_URL + "api/login";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: username,
      password: password
    })
  })
  .then((response) => response.json())
  .then(responseJson => responseJson)
  .catch(error=> "error")};

export const refreshToken = (token) => {
  const url = API_URL + "api/refresh-token";
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
    console.log ("refresh token...", responseJson)
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const getUser = (token) => {
  const url = API_URL + "api/user";
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
export const logout = (token) => {
  const url = API_URL + "api/logout";
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

export const forgotPassword = (email) => {
  const url = API_URL + "api/forgot-password";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};




