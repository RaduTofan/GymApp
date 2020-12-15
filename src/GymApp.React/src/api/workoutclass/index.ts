import config from "../../config";
import { PaginatedResult } from "../../lib/grid/PaginatedResult";
import { PaginatedRequest } from "../../lib/grid/PaginatedRequest";
import { WorkoutClassGridRow } from "./models/WorkoutClassGridRow";
import { WorkoutClass } from "./models/WorkoutClass";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');


export const getWorkoutClassById = (index: number) => {
    return async () => {
        const response = await fetch(`${API_URL}workoutclasses/${index}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+authToken,
                'Content-Type': 'application/json'
            }})
        const json = response.ok ? await response.json() : {};

        return json;
    }
}

export const getAllWorkoutClasses = async () => {
    const result = await fetch(`${API_URL}workoutclasses`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+authToken,
            'Content-Type': 'application/json'
        }});
    const data = await result.json();

    return data;

}


export const addWorkoutClass = async (workoutclassesData: any) => {
    
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer '+authToken,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(workoutclassesData)
    };

    fetch(`${API_URL}workoutclasses`, requestOptions)
        .then(response => response.text())
        .then(res => console.log(res))
        .catch(error => {
            console.log('Error while adding workoutclass: ', error);
        })

    return;
}


export const getWorkoutClassesPaged =
  async (paginatedRequest: PaginatedRequest) => {
      console.log(paginatedRequest);
    const response = await fetch(API_URL + 'workoutclasses/PaginatedSearch/', {
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

    const data: PaginatedResult<WorkoutClassGridRow> = await response.json();
    return data;
}

export const updateWorkoutClass = async(workoutClassForUpdate : WorkoutClass)=>{
    console.log("UPDATE THIS BRF",workoutClassForUpdate);
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+authToken,
             'Content-Type': 'application/json' 
            },
        body: JSON.stringify(workoutClassForUpdate)
    };

     fetch(`${API_URL}workoutclasses/${workoutClassForUpdate.id}`, requestOptions)
        .then(response => response.text())
        .then(res => console.log(res))
        .catch(error => {
            console.log('Error while updating workout class: ', error);
        })
    return;
}

export const removeWorkoutClass = async(id :number)=>{
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+authToken,
             'Content-Type': 'application/json' 
            }
    };

    return fetch(`${API_URL}workoutclasses/${id}`, requestOptions)
        .then(response => response)
        .catch(error => {
            console.log('Error while deleting workout class: ', error);
        })
}