using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace GymApp.Domain
{
    public abstract class Entity
    {
        public long Id { get; set; }
    }
}
