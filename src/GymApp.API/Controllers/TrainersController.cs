using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GymApp.API;
using GymApp.Domain;
using GymApp.API.Dtos.Trainer;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITrainerService _trainerService;

        public TrainersController(ITrainerService trainerService, IMapper mapper)
        {
            _trainerService = trainerService;
            _mapper = mapper;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            var trainers = _trainerService.GetTrainers();
            var result = trainers.Select(e => _mapper.Map<TrainerDto>(e));

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetTrainer(long id)
        {
            var trainer = _trainerService.GetTrainerById(id);
            if (trainer == null)
                return NotFound();

            var result = _mapper.Map<TrainerDto>(trainer);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateTrainerDto dto)
        {
            var trainer = _trainerService.AddNewTrainer(dto);

            if (trainer == null)
            {
                return BadRequest("Trainer with such phone already exists!");
            }

            var result = _mapper.Map<TrainerDto>(trainer);

            return CreatedAtAction(nameof(GetTrainer), new { id = trainer.Id }, result);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] CreateTrainerDto dto)
        {
            var trainer = _trainerService.UpdateTrainer(id, dto);

            if (trainer == null)
            {
                return BadRequest("The trainer you are trying to update doesn't exist or such phone already exists!");
            }


            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var isDeleted = _trainerService.RemoveTrainerById(id);

            if (isDeleted)
            {
                return NoContent();
            }
            else
            {
                return NotFound("The trainer you are trying to delete was not found");
            }
        }

        [HttpPost("PaginatedSearch")]
        public IActionResult GetPaginatedTrainers([FromBody] PaginatedRequest pagedRequest)
        {
            var pagedTrainers = _trainerService.GetPaginatedTrainers(pagedRequest);

            return Ok(pagedTrainers.Result);
        }


    }
}
