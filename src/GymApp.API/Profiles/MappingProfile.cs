using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Dtos.Client;
using GymApp.API.Dtos.Trainer;

namespace GymApp.API.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Client, ClientDto>();
            CreateMap<Trainer, TrainerDto>();
            CreateMap<WorkoutClass, WorkoutClassDto>();

        }
    }
}
