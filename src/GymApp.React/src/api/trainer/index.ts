import config from "../../config";
import { PaginatedRequest } from "../../lib/grid/PaginatedRequest";
import { PaginatedResult } from "../../lib/grid/PaginatedResult";
import { TrainerGridRow } from "./models/TrainerGridRow";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');


export const useGetTrainerById = (index: any) => {
    return async () => {
        const response = await fetch(`${API_URL}trainers/${index.match.params.id}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+authToken,
                'Content-Type': 'application/json'
            }})
        const json = response.ok ? await response.json() : {};

        return json;
    }
}

export const useGetAllTrainers = async () => {
    const result = await fetch(`${API_URL}trainers`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+authToken,
            'Content-Type': 'application/json'
        }});
    const data = await result.json();

    return data;

}


export const addTrainer = async (trainerData: any) => {
    
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: trainerData
    };

    fetch(`${API_URL}trainers`, requestOptions)
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(error => {
            console.log('Error while adding trainer: ', error);
        })

    return;
}

export const getTrainersPaged =
  async (paginatedRequest: PaginatedRequest) => {
    const response = await fetch(API_URL + 'trainers/PaginatedSearch/', {
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

    const data: PaginatedResult<TrainerGridRow> = await response.json();
    return data;
}