using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos.WorkoutClass
{
    public class WorkoutClassGridRowDto
    {
        public long Id { get; set; }
        public string Trainer { get; set; }
        public string Client { get; set; }
        public DateTime ScheduledTime { get; set; }
        public string ExercisePlan { get; set; }
    }
}
