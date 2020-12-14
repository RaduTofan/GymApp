using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Services.Interfaces
{
    public interface IWorkoutClassService
    {
        IList<WorkoutClassDto> GetWorkoutClasses();
        WorkoutClassDto GetWorkoutClassById(long id);

        WorkoutClassDto AddNewWorkoutClass(CreateWorkoutClassDto dto);

        WorkoutClassDto UpdateWorkoutClass(long id, CreateWorkoutClassDto dto);

        bool RemoveWorkoutClassById(long id);

        Task<PaginatedResult<WorkoutClassGridRowDto>> GetPaginatedWorkoutClasses(PaginatedRequest paginatedRequest);
    }
}
