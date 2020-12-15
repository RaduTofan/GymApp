import config from "../../config";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');


export const getNutritionPlanById = (index: number) => {
    return async () => {
        const response = await fetch(`${API_URL}nutritionplans/${index}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+authToken,
                'Content-Type': 'application/json'
            }})
        const json = response.ok ? await response.json() : {};

        return json;
    }
}

export const getAllNutritionPlans = async () => {
    const result = await fetch(`${API_URL}nutritionplans`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+authToken,
            'Content-Type': 'application/json'
        }});
    const data = await result.json();

    return data;

}