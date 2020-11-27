using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Services.Interfaces;

namespace GymApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutClassController : ControllerBase
    {
        private readonly IWorkoutClassService _workoutClassService;
        private readonly IMapper _mapper;

        public WorkoutClassController(IWorkoutClassService workoutClassService, IMapper mapper)
        {
            _workoutClassService = workoutClassService;
            _mapper = mapper;
        }

        // GET: api/<WorkoutClasssController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var workoutClasses = _workoutClassService.GetWorkoutClasses();
            var result = workoutClasses.Select(e => _mapper.Map<WorkoutClassDto>(e));

            return Ok(result);
        }

        // POST api/<WorkoutClasssController>
        [HttpPost]
        public IActionResult Post([FromBody] CreateWorkoutClassDto dto)
        {
            var WorkoutClass = _workoutClassService.AddNewWorkoutClass(dto);

            var result = _mapper.Map<WorkoutClassDto>(WorkoutClass);

            //return CreatedAtAction(nameof(GetAll), result);
            return Ok(result);
        }

        // GET api/<WorkoutClasssController>/id
        [HttpGet("{id}")]
        public IActionResult GetWorkoutClass(long id)
        {
            var workoutClass = _workoutClassService.GetWorkoutClassById(id);
            if (workoutClass == null)
                return NotFound();

            var result = _mapper.Map<WorkoutClassDto>(workoutClass);
            return Ok(result);
        }

        // PUT api/<WorkoutClasssController>/id
        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] CreateWorkoutClassDto dto)
        {
            var workoutClass = _workoutClassService.UpdateWorkoutClass(id, dto);

            if (workoutClass == null)
                return BadRequest("Failed to update clientxd");

            return NoContent();
        }


        // DELETE api/<WorkoutClasssController>/id
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var isDeleted = _workoutClassService.RemoveWorkoutClassById(id);

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
