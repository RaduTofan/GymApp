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

        public ExercisePlanService(IRepository<ExercisePlan> exercisePlanRepository)
        {
            _exercisePlanRepository = exercisePlanRepository;
        }

        public IList<ExercisePlan> GetExercisePlans()
        {
            return _exercisePlanRepository.GetAll();
        }
    }
}
