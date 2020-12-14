using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GymApp.Domain
{
    public class NutritionPlanMeal
    {
        public long NutritionPlanId { get; set; }
        public NutritionPlan NutritionPlan { get; set; }
        public long MealId { get; set; }
        public Meal Meal { get; set; }
    }
}
