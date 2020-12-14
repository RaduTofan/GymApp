using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;
using AutoMapper;

namespace GymApp.API.Services.Implementations
{
    public class WorkoutClassService : IWorkoutClassService
    {
        private readonly IRepository<WorkoutClass> _workoutClassRepository;
        private readonly IRepository<Trainer> _trainerRepository;
        private readonly IRepository<Client> _clientRepository;
        private readonly IRepository<ExercisePlan> _exercisePlanRepository;
        private readonly IMapper _mapper;

        public WorkoutClassService(IRepository<WorkoutClass> workoutClassRepository,
            IRepository<Trainer> trainerRepository,
            IRepository<Client> clientRepository,
            IRepository<ExercisePlan> exercisePlanRepository,
            IMapper mapper)
        {
            _workoutClassRepository = workoutClassRepository;
            _trainerRepository = trainerRepository;
            _clientRepository = clientRepository;
            _exercisePlanRepository = exercisePlanRepository;
            _mapper = mapper;
        }

        public WorkoutClassDto AddNewWorkoutClass(CreateWorkoutClassDto dto)
        {
            if ((_clientRepository.Get(dto.ClientId) == null) ||
                (_trainerRepository.Get(dto.TrainerId) == null) ||
                (_exercisePlanRepository.Get(dto.ExercisePlanId)) == null)
            {
                return null;
            }

            var workoutClass = _mapper.Map<WorkoutClass>(dto);

            _workoutClassRepository.Add(workoutClass);
            _workoutClassRepository.Save();

            var result = _mapper.Map<WorkoutClassDto>(workoutClass);

            return result;
        }

        public WorkoutClassDto GetWorkoutClassById(long id)
        {
            var workoutClass = _workoutClassRepository.Get(id);

            var result = _mapper.Map<WorkoutClassDto>(workoutClass);

            return result;
        }


        public IList<WorkoutClassDto> GetWorkoutClasses()
        {
            var workoutClasses = _workoutClassRepository.GetAll();
            var result =  _mapper.Map<IList<WorkoutClassDto>>(workoutClasses);
            return result;
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

        public WorkoutClassDto UpdateWorkoutClass(long id, CreateWorkoutClassDto dto)
        {
            if ((_clientRepository.Get(dto.ClientId) == null) ||
                (_trainerRepository.Get(dto.TrainerId) == null) ||
                (_exercisePlanRepository.Get(dto.ExercisePlanId)) == null)
            {
                return null;
            }

            var workoutClass = _workoutClassRepository.Get(id);
            _mapper.Map(dto, workoutClass);

            _workoutClassRepository.Save();

            var result = _mapper.Map<WorkoutClassDto>(workoutClass);

            return result;
        }



        public async Task<PaginatedResult<WorkoutClassGridRowDto>> GetPaginatedWorkoutClasses(PaginatedRequest paginatedRequest)
        {
            var workoutClasses = await _workoutClassRepository.GetPagedData<WorkoutClass, WorkoutClassGridRowDto>(paginatedRequest);

            return workoutClasses;
        }
    }
}
