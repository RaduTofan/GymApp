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


        public ExercisePlansController(IExercisePlanService exercisePlanService)
        {
            _exercisePlanService = exercisePlanService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _exercisePlanService.GetExercisePlans();

            return Ok(result);
        }


    }
}
