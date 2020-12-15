import {Meal} from './Meal';

export interface NutritionPlanMenu {
    id: number,
    nutritionType: string
    meals: Meal[]

}