using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.Client;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Services.Interfaces
{
    public interface IClientService
    {
        IList<ClientDto> GetClients();
        ClientDto GetClientById(long id);

        ClientDto AddNewClient(CreateClientDto dto);

        ClientDto UpdateClient(long id, CreateClientDto dto);

        bool RemoveClientById(long id);

        Task<PaginatedResult<ClientGridRowDto>> GetPaginatedClients(PaginatedRequest paginatedRequest);
    }
}
