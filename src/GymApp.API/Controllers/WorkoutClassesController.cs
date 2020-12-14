using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GymApp.API.Dtos.WorkoutClass;
using GymApp.API.Services.Interfaces;
using GymApp.API.Infrastructure.Models;

namespace GymApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutClassesController : ControllerBase
    {
        private readonly IWorkoutClassService _workoutClassService;
        private readonly IMapper _mapper;

        public WorkoutClassesController(IWorkoutClassService workoutClassService, IMapper mapper)
        {
            _workoutClassService = workoutClassService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var workoutClasses = _workoutClassService.GetWorkoutClasses();
            var result = workoutClasses.Select(e => _mapper.Map<WorkoutClassDto>(e));

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateWorkoutClassDto dto)
        {
            var workoutClass = _workoutClassService.AddNewWorkoutClass(dto);

            if (workoutClass == null)
            {
                return BadRequest("There is no such trainer, client or exercise plan in the database!");
            }

            var result = _mapper.Map<WorkoutClassDto>(workoutClass);

            return CreatedAtAction(nameof(GetAll), result);
        }

        [HttpGet("{id}")]
        public IActionResult GetWorkoutClass(long id)
        {
            var workoutClass = _workoutClassService.GetWorkoutClassById(id);
            if (workoutClass == null)
                return NotFound();

            var result = _mapper.Map<WorkoutClassDto>(workoutClass);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Put(long id, [FromBody] CreateWorkoutClassDto dto)
        {
            var workoutClass = _workoutClassService.UpdateWorkoutClass(id, dto);
            if (workoutClass == null)
            {
                return BadRequest("There is no such trainer, client or exercise plan in the database!");
            }


            return NoContent();
        }


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

        [HttpPost("PaginatedSearch")]
        public IActionResult GetPaginatedWorkoutClasses([FromBody] PaginatedRequest pagedRequest)
        {
            var pagedWorkoutClasses = _workoutClassService.GetPaginatedWorkoutClasses(pagedRequest);

            return Ok(pagedWorkoutClasses.Result);
        }
    }
}

