using System;
using System.Collections.Generic;
using System.Text;

namespace GymApp.Domain
{
    public class Meal : Entity
    {
        public string MealName { get; set; }
        public ICollection<Meal> NutritionPlanMeals { get; set; }
    }
}
