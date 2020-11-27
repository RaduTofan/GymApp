using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.Domain.EFMapping
{
    public class WorkoutClassConfig : IEntityTypeConfiguration<WorkoutClass>
    {
        public void Configure(EntityTypeBuilder<WorkoutClass> builder)
        {

            builder.Property(e => e.ClientId).IsRequired();

            builder.Property(e => e.ExercisePlanId).IsRequired();

            builder.Property(e => e.TrainerId).IsRequired();

            builder.Property(e => e.ScheduledTime).IsRequired();

            builder.HasKey(wk => new { wk.ClientId, wk.TrainerId });

            builder.HasOne(d => d.ExercisePlan)
                .WithMany()
                .HasForeignKey(d => d.ExercisePlanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__WorkoutCl__Exerc__5535A963");
        }
    }
}
