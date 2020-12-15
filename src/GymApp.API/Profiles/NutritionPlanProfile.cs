using AutoMapper;
using GymApp.API.Dtos.NutritionPlan;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Profiles
{
    public class NutritionPlanProfile : Profile
    {
        public NutritionPlanProfile()
        {
            CreateMap<NutritionPlan, NutritionPlanDto>();
            CreateMap<NutritionPlan, NutritionPlanMenuDto>()
            .ForMember(dto => dto.Meals, opt => opt.MapFrom(x => x.NutritionPlanMeals.Select(y => y.Meal)));

        }
    }
}
