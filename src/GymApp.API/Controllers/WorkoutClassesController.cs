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

        public WorkoutClassesController(IWorkoutClassService workoutClassService)
        {
            _workoutClassService = workoutClassService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _workoutClassService.GetWorkoutClasses();

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

            return CreatedAtAction(nameof(GetAll), new { id = workoutClass.Id }, workoutClass);
        }

        [HttpGet("{id}")]
        public IActionResult GetWorkoutClass(long id)
        {
            var workoutClass = _workoutClassService.GetWorkoutClassById(id);
            if (workoutClass == null)
                return NotFound();

            return Ok(workoutClass);
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

