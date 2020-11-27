using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos.WorkoutClass
{
    public class WorkoutClassDto
    {
        public long TrainerId { get; set; }
        public long ClientId { get; set; }
        public DateTime ScheduledTime { get; set; }
        public long ExercisePlanId { get; set; }
    }
}
