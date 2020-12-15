import React, { useEffect } from 'react'
import { getNutritionPlanById } from '../../api/nutritionplan';

const NutritionPlansList = () => {

    useEffect(() => {
        (async () => {
            try {
                let data = await getNutritionPlanById(5)();
                console.log(data);
            } catch (error) {
                console.error(error);
            } 
        })();

    }, []);


    return (
        <h1>nutrition plan list</h1>
    )
}



export default NutritionPlansList;