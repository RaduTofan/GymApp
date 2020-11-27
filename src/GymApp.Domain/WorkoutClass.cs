using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace GymApp.Domain
{
    public class WorkoutClass : Entity
    {
        public long TrainerId { get; set; }
        public virtual Trainer Trainer { get; set; }

        public long ClientId { get; set; }
        public virtual Client Client { get; set; }
        public DateTime ScheduledTime { get; set; }
        public long ExercisePlanId { get; set; }
        public virtual ExercisePlan ExercisePlan { get; set; }
    }
}
