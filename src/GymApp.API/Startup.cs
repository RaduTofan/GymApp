using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using GymApp.API;
using Microsoft.EntityFrameworkCore;
using GymApp.Domain;
using AutoMapper;
using GymApp.API.Profiles;
using GymApp.API.Repositories.Interfaces;
using GymApp.API.Repositories.Implementations;
using GymApp.API.Services.Interfaces;
using GymApp.API.Services.Implementations;
using Microsoft.OpenApi.Models;
using GymApp.Domain.Auth;
using GymApp.API.Infrastructure.Extensions;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace GymApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<GymAppDbContext>(optionsbuilder =>
            {
                optionsbuilder.UseSqlServer(Configuration.GetConnectionString("GymAppConnection"));
            });

            var mapperConfig = new MapperConfiguration(m => m.AddProfile(new MappingProfile()));

            ConfigureSwagger(services);

            services.AddControllers();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<ITrainerService, TrainerService>();

            services.AddSingleton(mapperConfig.CreateMapper());
            services.AddScoped<IClientService, ClientService>();

            services.AddScoped<IWorkoutClassService, WorkoutClassService>();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyMethod();
                        builder.AllowAnyHeader();
                    });
            });



            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<GymAppDbContext>();

            var authOptions = services.ConfigureAuthOptions(Configuration);
            services.AddJwtAuthentication(authOptions);
            services.AddControllers(options =>
            {
                options.Filters.Add(new AuthorizeFilter());
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors();
            app.UseRouting();

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json",
                "Swagger Demo API v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureSwagger(IServiceCollection services)
        {
            var contact = new OpenApiContact()
            {
                Name = "FirstName LastName",
                Email = "user@example.com",
                Url = new Uri("http://www.example.com")
            };

            var license = new OpenApiLicense()
            {
                Name = "My License",
                Url = new Uri("http://www.example.com")
            };

            var info = new OpenApiInfo()
            {
                Version = "v1",
                Title = "Swagger Demo API",
                Description = "Swagger Demo API Description",
                TermsOfService = new Uri("http://www.example.com"),
                Contact = contact,
                License = license
            };

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", info);
            });
        }
    }
}
