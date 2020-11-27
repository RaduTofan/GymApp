using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GymApp.API.Dtos
{
    public class UpdateTrainerDto
    {
        [StringLength(128, MinimumLength = 3, ErrorMessage = "Name is too short")]
        public string FullName { get; set; }

        [Range(0, 120)]
        public int Experience { get; set; }

        [Range(typeof(DateTime), "1/1/1950", "1/1/2005",
        ErrorMessage = "Value for {0} must be between {1} and {2}")]
        public DateTime DateOfBirth { get; set; }

        [StringLength(128, MinimumLength = 7, ErrorMessage = "E-mail is too short")]
        [EmailAddress]
        public string Email { get; set; }
        
        [StringLength(9, MinimumLength = 9, ErrorMessage = "Incorrect phone number")]
        public string Phone { get; set; }
    }
}
