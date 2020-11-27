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
        public DateTime ScheduledTime { get; set; }

        [Required]
        public long ExercisePlanId { get; set; }
    }
}
