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
        private readonly IMapper _mapper;


        public NutritionPlansController(INutritionPlanService nutritionPlanService, IMapper mapper)
        {
            _nutritionPlanService = nutritionPlanService;
            _mapper = mapper;
        }

        // GET: api/<NutritionPlansController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var nutritionPlans = _nutritionPlanService.GetNutritionPlans();
            var result = nutritionPlans.Select(e => _mapper.Map<NutritionPlanDto>(e));

            return Ok(result);
        }

        // GET api/<NutritionPlansController>/5
        [HttpGet("{id}")]
        public IActionResult GetNutritionPlan(long id)
        {
            var nutritionPlan = _nutritionPlanService.GetNutritionPlanById(id);
            if (nutritionPlan == null)
                return NotFound();

            var result = _mapper.Map<NutritionPlanDto>(nutritionPlan);
            return Ok(result);
        }

       
    }
}
