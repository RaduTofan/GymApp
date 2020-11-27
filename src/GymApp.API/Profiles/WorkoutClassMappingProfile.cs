using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;

namespace GymApp.API.Profiles
{
    public class WorkoutClassMappingProfile : Profile
    {
        public WorkoutClassMappingProfile()
        {
            CreateMap<WorkoutClass, WorkoutClassDto>();
        }
    }
}
