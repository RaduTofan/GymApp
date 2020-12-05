using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GymApp.API.Dtos.Client;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMapper _mapper;

        public ClientsController(IClientService clientService, IMapper mapper)
        {
            _clientService = clientService;
            _mapper = mapper;
        }


        // GET: api/<ClientsController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var clients = _clientService.GetClients();
            var result = clients.Select(e => _mapper.Map<ClientDto>(e));

            return Ok(result);
        }

        // GET api/<clientsController>/id
        [HttpGet("{id}")]
        public IActionResult GetClient(long id)
        {
            var client = _clientService.GetClientById(id);
            if (client == null)
                return NotFound();

            var result = _mapper.Map<ClientDto>(client);
            return Ok(result);
        }

        // POST api/<clientsController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateClientDto dto)
        {
            var client = _clientService.AddNewClient(dto);

            if (client == null)
            {
                return BadRequest("Client with such phone already exists!");
            }

            var result = _mapper.Map<ClientDto>(client);

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, result);
        }

        // PUT api/<clientsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] CreateClientDto dto)
        {
            var client = _clientService.UpdateClient(id, dto);

            if (client == null)
            {
                return BadRequest("The client you are trying to update doesn't exist or such phone already exists!");
            }
            return NoContent();
        }


        // DELETE api/<clientsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var isDeleted = _clientService.RemoveClientById(id);

            if (isDeleted)
            {
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("PaginatedSearch")]
        public IActionResult GetPaginatedClients([FromBody] PaginatedRequest pagedRequest)
        {
            var pagedClients = _clientService.GetPaginatedClients(pagedRequest);

            return Ok(pagedClients.Result);
        }
    }
}
