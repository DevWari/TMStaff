import { API_URL } from 'src/utils/config';

export const getAllCourses = (token) => {
  const url = API_URL + "courses";
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
    console.log ("service...all courses", responseJson)
    return responseJson
  })
  .catch((error) => {
    return "error";
  });
};

export const getCourse = (hashedId, token) => {
    console.log ("getCourse Service...", hashedId)
    console.log ("getCourse Service...", token)
    const url = API_URL + "course";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`, 
      },
      body: JSON.stringify({hashed_id: hashedId})
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log ("service...course", responseJson)
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};

export const sendMarkCourse = (hashedId, token) => {
    const url = API_URL + "complete-course";
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`, 
      },
      body: JSON.stringify({hashed_id: hashedId})
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log ("send mark...course", responseJson)
      return responseJson
    })
    .catch((error) => {
      return "error";
    });
};
  



