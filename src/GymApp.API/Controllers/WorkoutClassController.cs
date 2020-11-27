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
    }
}
