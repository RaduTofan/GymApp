using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos.Client
{
    public class ClientGridRowDto
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Height { get; set; }
        public float ClientWeight { get; set; }
        public string NutritionPlan { get; set; }
    }
}
