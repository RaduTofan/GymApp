using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Services.Implementations
{
    public class WorkoutClassService : IWorkoutClassService
    {
        private readonly IRepository<WorkoutClass> _workoutClassRepository;

        public WorkoutClassService(IRepository<WorkoutClass> workoutClassRepository)
        {
            _workoutClassRepository = workoutClassRepository;
        }

        public WorkoutClass AddNewWorkoutClass(CreateWorkoutClassDto dto)
        {
            if (_workoutClassRepository.Get(x => x.ClientId == dto.ClientId)==null ||
                _workoutClassRepository.Get(x => x.TrainerId == dto.TrainerId)==null)
            {
                return null;
            }

            var workoutClass = new WorkoutClass
            {
                TrainerId = dto.TrainerId,
                ClientId = dto.ClientId,
                ScheduledTime = dto.ScheduledTime,
                ExercisePlanId = dto.ExercisePlanId
            };

            _workoutClassRepository.Add(workoutClass);
            _workoutClassRepository.Save();

            return workoutClass;
        }

        public WorkoutClass GetWorkoutClassById(long id)
        {
            return _workoutClassRepository.Get(id);
        }


        public IList<WorkoutClass> GetWorkoutClasses()
        {
            IQueryable<WorkoutClass> workoutClasses;
            workoutClasses = _workoutClassRepository.GetAll();

            return workoutClasses.ToList();
        }

        public bool RemoveWorkoutClassById(long id)
        {
            var workoutClass = _workoutClassRepository.Get(id);
            if (workoutClass != null)
            {
                _workoutClassRepository.Remove(workoutClass);
                _workoutClassRepository.Save();
                return true;
            }
            else return false;
        }

        public WorkoutClass UpdateWorkoutClass(long id, CreateWorkoutClassDto dto)
        {
            if (_workoutClassRepository.Get(dto.ClientId) == null || _workoutClassRepository.Get(dto.TrainerId) == null)
            {
                return null;
            }

            var workoutClass = _workoutClassRepository.Get(id);

            workoutClass.TrainerId = dto.TrainerId;
            workoutClass.ClientId = dto.ClientId;
            workoutClass.ScheduledTime = dto.ScheduledTime;
            workoutClass.ExercisePlanId = dto.ExercisePlanId;

            _workoutClassRepository.Save();

            return workoutClass;
        }



        public async Task<PaginatedResult<WorkoutClassGridRowDto>> GetPaginatedWorkoutClasses(PaginatedRequest paginatedRequest)
        {
            var workoutClasses = await _workoutClassRepository.GetPagedData<WorkoutClass, WorkoutClassGridRowDto>(paginatedRequest);

            return workoutClasses;
        }
    }
}
