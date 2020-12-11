using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Dtos.Client;
using GymApp.API.Dtos.Trainer;
using GymApp.API.Dtos.NutritionPlan;
using GymApp.API.Dtos.ExercisePlan;

namespace GymApp.API.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Client, ClientDto>();
            CreateMap<Trainer, TrainerDto>();
            CreateMap<WorkoutClass, WorkoutClassDto>();
            CreateMap<NutritionPlan, NutritionPlanDto>();
            CreateMap<ExercisePlan, ExercisePlanDto>();

            CreateMap<Client, ClientGridRowDto>()
                .ForMember(x => x.NutritionPlan, y => y.MapFrom(z => z.NutritionPlan.NutritionType));
            CreateMap<Trainer, TrainerGridRowDto>();
            CreateMap<WorkoutClass, WorkoutClassGridRowDto>()
                .ForMember(x => x.Trainer, y => y.MapFrom(z => z.Trainer.FullName))
                .ForMember(x => x.Client, y => y.MapFrom(z => z.Client.FullName))
                .ForMember(x => x.ExercisePlan, y => y.MapFrom(z => z.ExercisePlan.ExercisesType));



        }
    }
}
