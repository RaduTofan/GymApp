using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos;
using GymApp.API.Repositories.Interfaces;

namespace GymApp.API.Services
{
    public class TrainerService : ITrainerService
    {
        private readonly IRepository<Trainer> _trainerRepository;

        public TrainerService(IRepository<Trainer> trainerRepository)
        {
            _trainerRepository = trainerRepository;
        }
        public Trainer AddNewTrainer(CreateTrainerDto dto)
        {
            var trainer = new Trainer
            {
                FullName = dto.FullName,
                Experience = dto.Experience,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email,
                Phone = dto.Phone
            };

            _trainerRepository.Add(trainer);
            _trainerRepository.Save();
            return trainer;
        }

        public Trainer GetTrainerById(long id)
        {
            return _trainerRepository.Get(id);
        }

        public IList<Trainer> GetTrainers()
        {
            IQueryable<Trainer> trainers;
            trainers = _trainerRepository.GetAll();

            return trainers.ToList();
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

        public Trainer UpdateTrainer(long id, CreateTrainerDto dto)
        {
            var trainer = _trainerRepository.Get(id);

            trainer.FullName = dto.FullName;
            trainer.Experience = dto.Experience;
            trainer.DateOfBirth = dto.DateOfBirth;
            trainer.Email = dto.Email;
            trainer.Phone = dto.Phone;

            _trainerRepository.Save();

            return trainer;

        }

    }
}
