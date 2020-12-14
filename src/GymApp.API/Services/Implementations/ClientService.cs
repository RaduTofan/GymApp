using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.API.Dtos.Client;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;
using AutoMapper;

namespace GymApp.API.Services.Implementations
{
    public class ClientService : IClientService
    {
        private readonly IRepository<Client> _clientRepository;
        private readonly IMapper _mapper;

        public ClientService(IRepository<Client> clientRepository, IMapper mapper)
        {
            _clientRepository = clientRepository;
            _mapper = mapper;
        }
        public ClientDto AddNewClient(CreateClientDto dto)
        {
            if (PhoneExists(dto.Phone))
            {
                return null;
            }

            var client = _mapper.Map<Client>(dto);

            _clientRepository.Add(client);
            _clientRepository.Save();

            var result = _mapper.Map<ClientDto>(client);

            return result;
        }

        public ClientDto GetClientById(long id)
        {
            var client = _clientRepository.Get(id);
            var result = _mapper.Map<ClientDto>(client);
            return result;
        }

        public IList<ClientDto> GetClients()
        {
            var clients = _clientRepository.GetAll();
            var result = _mapper.Map<IList<ClientDto>>(clients);
            return result;
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

            if (client == null || (dto.Phone != client.Phone && PhoneExists(dto.Phone)))
            {
                return null;
            }

            _mapper.Map(dto, client);

            _clientRepository.Save();

            return client;
        }

        private bool PhoneExists(string phone)
        {
            var clientPhone = _clientRepository.Get(x => x.Phone == phone);
            return clientPhone != null;
        }

        public async Task<PaginatedResult<ClientGridRowDto>> GetPaginatedClients(PaginatedRequest paginatedRequest)
        {
            var clients = await _clientRepository.GetPagedData<Client, ClientGridRowDto>(paginatedRequest);

            return clients;
        }
    }
}
