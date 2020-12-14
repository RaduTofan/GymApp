using AutoMapper;
using GymApp.API.Dtos.ExercisePlan;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Profiles
{
    public class ExercisePlanProfile : Profile
    {
        public ExercisePlanProfile()
        {
            CreateMap<ExercisePlan, ExercisePlanDto>();

        }
    }
}
