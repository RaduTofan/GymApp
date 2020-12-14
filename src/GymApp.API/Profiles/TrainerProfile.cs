using AutoMapper;
using GymApp.API.Dtos.Trainer;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Profiles
{
    public class TrainerProfile : Profile
    {
        public TrainerProfile()
        {
            CreateMap<Trainer, TrainerDto>();
            CreateMap<Trainer, TrainerGridRowDto>();

        }
    }
}
