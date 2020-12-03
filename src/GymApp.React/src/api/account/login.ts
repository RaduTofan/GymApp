import config from "../../config";
import {history}  from "../../history";

const baseUrl = config.API_URL + 'account/';


export interface UserForLogin {
    username: string;
    password: string;
}


export const login = async (form: UserForLogin) => {
  var token;
  fetch(baseUrl + 'login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(response=>response.json())
  .then(response=>{
    token = response.accessToken;
    localStorage.setItem('token',token);
    console.log("token from localstorage func",localStorage.getItem('token'));
    history.push("/admin");
  })
  .catch(error=>{
    console.log("Eror trying to login",error);
  });

  return token;
}

