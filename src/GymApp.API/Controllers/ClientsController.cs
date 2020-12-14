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

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _clientService.GetClients();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetClient(long id)
        {
            var result = _clientService.GetClientById(id);
            if (result == null)
                return NotFound();
            
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateClientDto dto)
        {
            var client = _clientService.AddNewClient(dto);

            if (client == null)
            {
                return BadRequest("Client with such phone already exists!");
            }

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }

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
