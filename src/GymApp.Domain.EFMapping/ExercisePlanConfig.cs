using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.Domain.EFMapping
{
    public class ExercisePlanConfig : IEntityTypeConfiguration<ExercisePlan>
    {
        public void Configure(EntityTypeBuilder<ExercisePlan> builder)
        {
            builder.HasIndex(e => e.ExercisesType)
                    .IsUnique();

            builder.Property(e => e.ExercisesType)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
