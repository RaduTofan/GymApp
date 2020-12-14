using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GymApp.Domain
{
    public class WorkoutClass : Entity
    {
        public long TrainerId { get; set; }
        public Trainer Trainer { get; set; }
        public long ClientId { get; set; }
        public Client Client { get; set; }
        public DateTime ScheduledTime { get; set; }
        public long ExercisePlanId { get; set; }
        public ExercisePlan ExercisePlan { get; set; }
    }
}
