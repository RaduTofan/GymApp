using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.Client;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;

namespace GymApp.API.Services.Implementations
{
    public class ClientService : IClientService
    {
        private readonly IRepository<Client> _clientRepository;

        public ClientService(IRepository<Client> clientRepository)
        {
            _clientRepository = clientRepository;
        }
        public Client AddNewClient(CreateClientDto dto)
        {
            var client = new Client
            {
                FullName = dto.FullName,
                DateOfBirth = dto.DateOfBirth,
                Email = dto.Email,
                Phone = dto.Phone,
                Height = dto.Height,
                ClientWeight = dto.ClientWeight,
                NutritionPlanId = dto.NutritionPlanId
            };

            _clientRepository.Add(client);
            _clientRepository.Save();
            return client;
        }

        public Client GetClientById(long id)
        {
            return _clientRepository.Get(id);
        }

        public IList<Client> GetClients()
        {
            IQueryable<Client> clients;
            clients = _clientRepository.GetAll();

            return clients.ToList();
        }

        public bool RemoveClientById(long id)
        {
            var client = _clientRepository.Get(id);
            if (client != null)
            {
                _clientRepository.Remove(client);
                _clientRepository.Save();
                return true;
            }
            else return false;
        }

        public Client UpdateClient(long id, CreateClientDto dto)
        {
            var client = _clientRepository.Get(id);

            client.FullName = dto.FullName;
            client.DateOfBirth = dto.DateOfBirth;
            client.Email = dto.Email;
            client.Phone = dto.Phone;
            client.Height = dto.Height;
            client.ClientWeight = dto.ClientWeight;
            client.NutritionPlanId = dto.NutritionPlanId;

            _clientRepository.Save();

            return client;
        }

    }
}
