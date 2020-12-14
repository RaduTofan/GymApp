using System;
using System.Collections.Generic;
using System.Text;

namespace GymApp.Domain
{
    public class Trainer : Entity
    {
        public string FullName { get; set; }
        public int Experience { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public ICollection<WorkoutClass> WorkoutClasses { get; set; }
    }
}
