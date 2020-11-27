using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos.WorkoutClass
{
    public class CreateWorkoutClassDto
    {
        [Required]
        public long TrainerId { get; set; }

        [Required]
        public long ClientId { get; set; }

        [Required]
        [Range(typeof(DateTime), "1/1/2020", "1/1/2025",
        ErrorMessage = "Value for {0} must be between {1} and {2}")]
        public DateTime ScheduledTime { get; set; }

        [Required]
        public long ExercisePlanId { get; set; }
    }
}
