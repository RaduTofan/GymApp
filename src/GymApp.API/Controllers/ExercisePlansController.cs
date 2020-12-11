using AutoMapper;
using GymApp.API.Dtos.ExercisePlan;
using GymApp.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace GymApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisePlansController : ControllerBase
    {

        private readonly IExercisePlanService _exercisePlanService;
        private readonly IMapper _mapper;


        public ExercisePlansController(IExercisePlanService exercisePlanService, IMapper mapper)
        {
            _exercisePlanService = exercisePlanService;
            _mapper = mapper;
        }

        // GET: api/<ExercisePlanController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var exercisePlans = _exercisePlanService.GetExercisePlans();
            var result = exercisePlans.Select(e => _mapper.Map<ExercisePlanDto>(e));

            return Ok(result);
        }


    }
}
