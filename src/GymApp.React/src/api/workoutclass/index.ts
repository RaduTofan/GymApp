import config from "../../config";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');


export const useGetWorkoutClassById = (index: any) => {
    return async () => {
        const response = await fetch(`${API_URL}workoutclasses/${index.match.params.id}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+authToken,
                'Content-Type': 'application/json'
            }})
        const json = response.ok ? await response.json() : {};

        return json;
    }
}

export const useGetAllWorkoutClasses = async () => {
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
        headers: { 'Content-Type': 'application/json' },
        body: workoutclassesData
    };

    fetch(`${API_URL}workoutclasses`, requestOptions)
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(error => {
            console.log('Error while adding workoutclass: ', error);
        })

    return;
}