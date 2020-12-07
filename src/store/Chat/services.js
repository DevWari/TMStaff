import { API_URL } from 'src/utils/config';
import Axios from 'axios'

export const getChats = (data, token) => {
  const url = API_URL + "chats";
  
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

export const getChatsHistory = (data, token) => {
  const url = API_URL + "history-chats";
  
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
export const getChatMessages = (data, token) => {
  const url = API_URL + "load-chat-messages";
  
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

export const getMessageDetail = (data, token) => {
  const url = API_URL + "load-message-details";
  
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

export const replyMessage = (data, token) => {  

  let headers = ''
  if (data.statusValue && data.statusValue == 1) {
    headers = {        
      Authorization:  `Bearer ${token}`,   
    }
  } else {
    headers = {  
      "Content-Type": "multipart/form-data",
      Authorization:  `Bearer ${token}`,   
    }
  }
  const url = API_URL + "reply-message"; 

  return Axios.post(url, data, {    
    "headers": headers
  })
  .then(res => { 
    console.log ("reply-message...", res)   
    return res
  })  
  .catch( error => error );  
};

export const newChatConversation = (data, token) => {

  let headers = ''
  if (data.statusValue && data.statusValue == 1) {
    headers = {        
      Authorization:  `Bearer ${token}`,   
    }
  } else {
    headers = {  
      "Content-Type": "multipart/form-data",
      Authorization:  `Bearer ${token}`,   
    }
  }
  const url = API_URL + "new-conversation"; 

  return Axios.post(url, data, {    
    "headers": headers
    })
  .then(res => {
    console.log ("aaaaa", res)
    return res
  })  
  .catch( error => error );  
};

export const moveChatToHistory = (data, token) => {
  const url = API_URL + "chat-to-history";
  
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

export const getUnreadMessages = (data, token) => {
  const url = API_URL + "count-unread-messages";
  
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

