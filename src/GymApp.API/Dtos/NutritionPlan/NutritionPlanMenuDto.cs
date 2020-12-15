using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos.NutritionPlan
{
    public class NutritionPlanMenuDto
    {
        public long Id { get; set; }
        public string NutritionType { get; set; }
        public ICollection<Meal> Meals { get; set; }
    }
}
