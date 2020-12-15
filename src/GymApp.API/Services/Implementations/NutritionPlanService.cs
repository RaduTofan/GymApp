using AutoMapper;
using GymApp.API.Dtos.NutritionPlan;
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
        private readonly IMapper _mapper;

        public NutritionPlanService(IRepository<NutritionPlan> nutritionPlanRepository, IMapper mapper)
        {
            _nutritionPlanRepository = nutritionPlanRepository;
            _mapper = mapper;
        }

        public NutritionPlanMenuDto GetNutritionPlanById(long id)
        {
            var nutritionPlan = _nutritionPlanRepository.Get(id);
            var result = _mapper.Map<NutritionPlanMenuDto>(nutritionPlan);

            return result;
        }

        public IList<NutritionPlanDto> GetNutritionPlans()
        {
            var nutritionPlans = _nutritionPlanRepository.GetAll();

            var result = _mapper.Map<IList<NutritionPlanDto>>(nutritionPlans);

            return result;
        }
    }
}
