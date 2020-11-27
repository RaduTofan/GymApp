using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using GymApp.Domain;
using GymApp.Domain.EFMapping;

namespace GymApp.API
{
    public class GymAppDbContext : DbContext
    {
        public GymAppDbContext(DbContextOptions<GymAppDbContext> options):base(options)
        {

        }


        public DbSet<NutritionPlan> NutritionPlans { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<NutritionPlanMeal> NutritionPlanMeals { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ExercisePlan> ExercisePlans { get; set; }
        public DbSet<WorkoutClass> WorkoutClasses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ClientConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(ClientConfig)));
            modelBuilder.ApplyConfiguration(new ExercisePlanConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(ExercisePlanConfig)));
            modelBuilder.ApplyConfiguration(new MealConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(MealConfig)));
            modelBuilder.ApplyConfiguration(new NutritionPlanMealConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(NutritionPlanMealConfig)));
            modelBuilder.ApplyConfiguration(new NutritionPlanConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(NutritionPlanConfig)));
            modelBuilder.ApplyConfiguration(new TrainerConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(TrainerConfig)));
            modelBuilder.ApplyConfiguration(new WorkoutClassConfig());
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(WorkoutClassConfig)));

        }

    }
}
