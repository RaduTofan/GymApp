using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;

namespace GymApp.API.Services.Interfaces
{
    public interface IWorkoutClassService
    {
        IList<WorkoutClass> GetWorkoutClasses();
        WorkoutClass GetWorkoutClassById(long id);

        WorkoutClass AddNewWorkoutClass(CreateWorkoutClassDto dto);

        WorkoutClass UpdateWorkoutClass(long id, CreateWorkoutClassDto dto);

        bool RemoveWorkoutClassById(long id);
    }
}
