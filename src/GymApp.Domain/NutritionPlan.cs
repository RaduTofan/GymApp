using System;
using System.Collections.Generic;
using System.Text;

namespace GymApp.Domain
{
    public class NutritionPlan : Entity
    {
        public string NutritionType { get; set; }
        public ICollection<NutritionPlanMeal> NutritionPlanMeals { get; set; }

    }
}
