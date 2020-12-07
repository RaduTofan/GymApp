import config from "../../config";
import { PaginatedResult } from "../../lib/grid/PaginatedResult";
import { PaginatedRequest } from "../../lib/grid/PaginatedRequest";
import { ClientGridRow } from "./models/ClientGridRow";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');


export const useGetClientById = (index: any) => {
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

export const useGetAllClients = async () => {
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