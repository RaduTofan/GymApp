using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.Domain.EFMapping
{
    public class NutritionPlanConfig : IEntityTypeConfiguration<NutritionPlan>
    {
        public void Configure(EntityTypeBuilder<NutritionPlan> builder)
        {
            builder.HasIndex(e => e.NutritionType)
                   .IsUnique();

            builder.HasKey(e => e.Id);

            builder.Property(e => e.NutritionType)
                .IsRequired()
                .HasMaxLength(255)
                .IsUnicode(false);
        }
    }
}
