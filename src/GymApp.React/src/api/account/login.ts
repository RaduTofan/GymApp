import config from "../../config";
import {history}  from "../../history";

const baseUrl = config.API_URL + 'account/';


export interface UserForLogin {
    username: string;
    password: string;
}


export const login = async (form: UserForLogin) => {
  const response = await fetch(baseUrl + 'login/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const result = await response.json();
  const token = result.accessToken;

  if(response.ok && await result.accessToken!==null){
    localStorage.setItem('token',token)
    console.log("token from localstorage func",localStorage.getItem('token'));
    history.push("/admin")
  }

  return token;
}

