using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Services.Implementations
{
    public class NutritionPlanService : INutritionPlanService
    {
        private readonly IRepository<NutritionPlan> _nutritionPlanRepository;

        public NutritionPlanService(IRepository<NutritionPlan> nutritionPlanRepository)
        {
            _nutritionPlanRepository = nutritionPlanRepository;
        }

        public NutritionPlan GetNutritionPlanById(long id)
        {
            return _nutritionPlanRepository.Get(id);
        }

        public IList<NutritionPlan> GetNutritionPlans()
        {
            return _nutritionPlanRepository.GetAll();
        }
    }
}
