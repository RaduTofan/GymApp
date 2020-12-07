using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos.Trainer
{
    public class TrainerGridRowDto
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public int Experience { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}
