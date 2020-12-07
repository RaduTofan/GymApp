using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.Trainer;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Services.Interfaces
{
    public interface ITrainerService
    {
        IList<Trainer> GetTrainers();
        Trainer GetTrainerById(long id);

        Trainer AddNewTrainer(CreateTrainerDto dto);

        Trainer UpdateTrainer(long id, CreateTrainerDto dto);

        bool RemoveTrainerById(long id);

        Task<PaginatedResult<TrainerGridRowDto>> GetPaginatedTrainers(PaginatedRequest paginatedRequest);
    }
}
