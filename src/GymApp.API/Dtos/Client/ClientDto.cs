using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.API.Dtos.Client
{
    public class ClientDto
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Height { get; set; }
        public float ClientWeight { get; set; }
        public long? NutritionPlanId { get; set; }
    }
}
