using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GymApp.API;
using GymApp.Domain;
using GymApp.API.Dtos;
using GymApp.API.Services;

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


        // GET: api/<TrainersController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var trainers = _trainerService.GetTrainers();
            var result = trainers.Select(e => _mapper.Map<TrainerDto>(e));

            return Ok(result);
        }

        // GET api/<TrainersController>/id
        [HttpGet("{id}")]
        public IActionResult GetTrainer(long id)
        {
            var trainer = _trainerService.GetTrainerById(id);
            if (trainer == null)
                return NotFound();

            var result = _mapper.Map<TrainerDto>(trainer);
            return Ok(result);
        }

        // POST api/<TrainersController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateTrainerDto dto)
        {
            var trainer = _trainerService.AddNewTrainer(dto);

            var result = _mapper.Map<TrainerDto>(trainer);

            return CreatedAtAction(nameof(GetTrainer), new { id = trainer.Id }, result);
        }

        // PUT api/<TrainersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] CreateTrainerDto dto)
        {
            var trainer = _trainerService.UpdateTrainer(id, dto);



            if (trainer == null)
                return BadRequest("Failed to update trainerxd");

            return NoContent();
        }


        // DELETE api/<TrainersController>/5
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
                return NotFound();
            }
        }




    }
}
