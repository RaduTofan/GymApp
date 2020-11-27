using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.Domain.EFMapping
{
    public class MealConfig : IEntityTypeConfiguration<Meal>
    {
        public void Configure(EntityTypeBuilder<Meal> builder)
        {
            builder.HasIndex(e => e.MealName)
                    .IsUnique();

            builder.HasKey(e => e.Id);

            builder.Property(e => e.MealName)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
