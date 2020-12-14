using AutoMapper;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Profiles
{
    public class WorkoutClassProfile:Profile
    {
        public WorkoutClassProfile()
        {
            CreateMap<WorkoutClass, WorkoutClassDto>();
            CreateMap<WorkoutClass, WorkoutClassGridRowDto>()
                .ForMember(x => x.Trainer, y => y.MapFrom(z => z.Trainer.FullName))
                .ForMember(x => x.Client, y => y.MapFrom(z => z.Client.FullName))
                .ForMember(x => x.ExercisePlan, y => y.MapFrom(z => z.ExercisePlan.ExercisesType));
        }
    }
}
