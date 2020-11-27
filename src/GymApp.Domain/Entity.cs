using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GymApp.Domain
{
    public class Entity
    {
        [Key]
        public long Id { get; set; }
    }
}
