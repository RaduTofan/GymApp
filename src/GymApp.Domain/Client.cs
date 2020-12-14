using System;
using System.Collections.Generic;

namespace GymApp.Domain
{
    public class Client : Entity
    {
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Height { get; set; }
        public float ClientWeight { get; set; }
		public long? NutritionPlanId { get; set; }
        public NutritionPlan NutritionPlan { get; set; }
        public ICollection<WorkoutClass> WorkoutClasses { get; set; }
    }
}
