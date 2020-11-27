using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Repositories.Interfaces;

namespace GymApp.API.Services
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

        //public WorkoutClass GetWorkoutClassByClientId(long clientId)
        //{
        //    return _workoutClassRepository.Get(clientId);
        //}


        public IList<WorkoutClass> GetWorkoutClasses()
        {
            IQueryable<WorkoutClass> workoutClasses;
            workoutClasses = _workoutClassRepository.GetAll();

            return workoutClasses.ToList();
        }

        //public bool RemoveWorkoutClassById(long id)
        //{
        //    throw new NotImplementedException();
        //}

        //public WorkoutClass UpdateWorkoutClass(long id, CreateWorkoutClassDto dto)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
