import config from "../../config";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');



export const getAllExercisePlans = async () => {
    const result = await fetch(`${API_URL}exerciseplans`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+authToken,
            'Content-Type': 'application/json'
        }});
    const data = await result.json();

    return data;

}