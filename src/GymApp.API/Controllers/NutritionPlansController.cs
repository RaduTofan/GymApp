using AutoMapper;
using GymApp.API.Dtos.NutritionPlan;
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
    public class NutritionPlansController : ControllerBase
    {

        private readonly INutritionPlanService _nutritionPlanService;


        public NutritionPlansController(INutritionPlanService nutritionPlanService)
        {
            _nutritionPlanService = nutritionPlanService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _nutritionPlanService.GetNutritionPlans();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetNutritionPlan(long id)
        {
            var nutritionPlan = _nutritionPlanService.GetNutritionPlanById(id);
            if (nutritionPlan == null)
                return NotFound();

            return Ok(nutritionPlan);
        }

       
    }
}
