using GymApp.API.Dtos.ExercisePlan;
using GymApp.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Services.Interfaces
{
    public interface IExercisePlanService
    {
        IList<ExercisePlanDto> GetExercisePlans();
    }
}
