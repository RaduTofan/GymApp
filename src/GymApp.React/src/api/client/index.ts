import config from "../../config";
import { PaginatedResult } from "../../lib/grid/PaginatedResult";
import { PaginatedRequest } from "../../lib/grid/PaginatedRequest";
import { ClientGridRow } from "./models/ClientGridRow";
import { Client } from "./models/Client";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');


export const getClientById = (index: any) => {
    return async () => {
        const response = await fetch(`${API_URL}clients/${index.match.params.id}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+authToken,
                'Content-Type': 'application/json'
            }})
        const json = response.ok ? await response.json() : {};

        return json;
    }
}

export const getAllClients = async () => {
    const result = await fetch(`${API_URL}clients`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+authToken,
            'Content-Type': 'application/json'
        }});
    const data = await result.json();

    return data;

}


export const addClient = async (clientData: any) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+authToken,
             'Content-Type': 'application/json' 
            },
        body: JSON.stringify(clientData)
    };

    fetch(`${API_URL}clients`, requestOptions)
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(error => {
            console.log('Error while adding client: ', error);
        })

    return;
}

export const getClientsPaged =
  async (paginatedRequest: PaginatedRequest) => {
    const response = await fetch(API_URL + 'clients/PaginatedSearch/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paginatedRequest),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data: PaginatedResult<ClientGridRow> = await response.json();
    return data;
}

export const updateClient = async(clientForUpdate : Client)=>{
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+authToken,
             'Content-Type': 'application/json' 
            },
        body: JSON.stringify(clientForUpdate)
    };

    return fetch(`${API_URL}clients/${clientForUpdate.id}`, requestOptions)
        .then(response => response)
        .catch(error => {
            console.log('Error while updating client: ', error);
        })

}

export const removeClient = async(id :number)=>{
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+authToken,
             'Content-Type': 'application/json' 
            }
    };

    return fetch(`${API_URL}clients/${id}`, requestOptions)
        .then(response => response)
        .catch(error => {
            console.log('Error while deleting client: ', error);
        })
}