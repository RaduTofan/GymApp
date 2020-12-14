using AutoMapper;
using GymApp.API.Dtos.Client;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Profiles
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<Client, ClientDto>();
            CreateMap<CreateClientDto, Client>();
            CreateMap<Client, ClientGridRowDto>()
                .ForMember(x => x.NutritionPlan, y => y.MapFrom(z => z.NutritionPlan.NutritionType));
        }
    }
}
