using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.Client;

namespace GymApp.API.Services
{
    public interface IClientService
    {
        IList<Client> GetClients();
        Client GetClientById(long id);

        Client AddNewClient(CreateClientDto dto);

        Client UpdateClient(long id, CreateClientDto dto);

        bool RemoveClientById(long id);
    }
}
