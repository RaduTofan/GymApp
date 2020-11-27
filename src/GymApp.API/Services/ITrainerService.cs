using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos;

namespace GymApp.API.Services
{
    public interface ITrainerService
    {
        IList<Trainer> GetTrainers();
        Trainer GetTrainerById(long id);

        Trainer AddNewTrainer(CreateTrainerDto dto);

        Trainer UpdateTrainer(long id, CreateTrainerDto dto);

        bool RemoveTrainerById(long id);
    }
}
