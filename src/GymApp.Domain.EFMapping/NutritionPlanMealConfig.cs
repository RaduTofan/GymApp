using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.Domain.EFMapping
{
    public class NutritionPlanMealConfig : IEntityTypeConfiguration<NutritionPlanMeal>
    {
        public void Configure(EntityTypeBuilder<NutritionPlanMeal> builder)
        {
            builder.HasKey(pm => new { pm.MealId, pm.NutritionPlanId });
        }
    }
}
