using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Services.Interfaces
{
    public interface INutritionPlanService
    {
        IList<NutritionPlan> GetNutritionPlans();
        NutritionPlan GetNutritionPlanById(long id);
    }
}
