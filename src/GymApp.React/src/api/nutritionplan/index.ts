import config from "../../config";

const API_URL = config.API_URL;
const authToken = localStorage.getItem('token');
const ytApiKey1="AIzaSyBC_zYcmpUhk1gst7TioVpFG2SKyZcSEng";
const ytApiKey2="AIzaSyC9V-n1Q3lTnmTB7TJAPSVxIHO-81vV_LA";
const ytApiKey3="AIzaSyAptzjBGN_kvGeYV8Ey-_ksfDGq924brbE";


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

export const getYtVideosId = async(query:string) =>{
    const result = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${ytApiKey1}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }});
    
    const data = await result.json();

    return data;
}