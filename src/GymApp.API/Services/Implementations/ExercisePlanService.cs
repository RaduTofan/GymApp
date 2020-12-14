using AutoMapper;
using GymApp.API.Dtos.ExercisePlan;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Services.Implementations
{
    public class ExercisePlanService : IExercisePlanService
    {
        private readonly IRepository<ExercisePlan> _exercisePlanRepository;
        private readonly IMapper _mapper;

        public ExercisePlanService(IRepository<ExercisePlan> exercisePlanRepository, IMapper mapper)
        {
            _exercisePlanRepository = exercisePlanRepository;
            _mapper = mapper;
        }

        public IList<ExercisePlanDto> GetExercisePlans()
        {
            var exercisePlans = _exercisePlanRepository.GetAll();

            var result = _mapper.Map<IList<ExercisePlanDto>>(exercisePlans);
            return result;
        }
    }
}
