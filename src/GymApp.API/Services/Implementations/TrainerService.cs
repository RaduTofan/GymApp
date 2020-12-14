using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.Trainer;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;
using AutoMapper;

namespace GymApp.API.Services.Implementations
{
    public class TrainerService : ITrainerService
    {
        private readonly IRepository<Trainer> _trainerRepository;
        private readonly IMapper _mapper;

        public TrainerService(IRepository<Trainer> trainerRepository, IMapper mapper)
        {
            _trainerRepository = trainerRepository;
            _mapper = mapper;
        }
        public TrainerDto AddNewTrainer(CreateTrainerDto dto)
        {
            if (PhoneExists(dto.Phone))
            {
                return null;
            }

            var trainer = _mapper.Map<Trainer>(dto);

            _trainerRepository.Add(trainer);
            _trainerRepository.Save();

            var result = _mapper.Map<TrainerDto>(trainer);

            return result;
        }

        public TrainerDto GetTrainerById(long id)
        {
            var trainer = _trainerRepository.Get(id);
            var result = _mapper.Map<TrainerDto>(trainer);
            return result;
        }

        public IList<TrainerDto> GetTrainers()
        {
            var trainers=_trainerRepository.GetAll();
            var result = _mapper.Map<IList<TrainerDto>>(trainers);

            return result;
        }

        public bool RemoveTrainerById(long id)
        {
            var trainer = _trainerRepository.Get(id);
            if (trainer != null)
            {
                _trainerRepository.Remove(trainer);
                _trainerRepository.Save();
                return true;
            }
            else return false;
        }

        public TrainerDto UpdateTrainer(long id, CreateTrainerDto dto)
        {
            var trainer = _trainerRepository.Get(id);

            if (trainer == null || (dto.Phone != trainer.Phone && PhoneExists(dto.Phone)))
            {
                return null;
            }

            _mapper.Map(dto, trainer);

            _trainerRepository.Save();

            var result = _mapper.Map<TrainerDto>(trainer);

            return result;

        }
        private bool PhoneExists(string phone)
        {
            var trainerPhone = _trainerRepository.Get(x => x.Phone == phone);
            return trainerPhone != null;
        }

        public async Task<PaginatedResult<TrainerGridRowDto>> GetPaginatedTrainers(PaginatedRequest paginatedRequest)
        {
            var trainers = await _trainerRepository.GetPagedData<Trainer, TrainerGridRowDto>(paginatedRequest);

            return trainers;

        }
    }
}
