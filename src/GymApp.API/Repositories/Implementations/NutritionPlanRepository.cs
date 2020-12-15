using AutoMapper;
using GymApp.API.Infrastructure.Extensions;
using GymApp.API.Infrastructure.Models;
using GymApp.API.Repositories.Interfaces;
using GymApp.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GymApp.API.Repositories.Implementations
{
    public class NutritionPlanRepository<TEntity> : IRepository<TEntity> where TEntity : NutritionPlan
    {
        private readonly GymAppDbContext _context;
        private readonly DbSet<TEntity> _dbSet;
        private readonly IMapper _mapper;

        public NutritionPlanRepository(GymAppDbContext context, IMapper mapper)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
            _mapper = mapper;
        }

        public void Add(TEntity entity)
        {
            _dbSet.Add(entity);

        }

        public void Remove(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }


        public TEntity Get(long id)
        {
            var nutritionPlans = _dbSet.Include(x => x.NutritionPlanMeals)
                .ThenInclude(x => x.Meal).FirstOrDefault(x => x.Id == id);
            return nutritionPlans;
        }
        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.FirstOrDefault(predicate);
        }

        public IList<TEntity> GetAll()
        {
            return _dbSet.ToList();
        }

        TEntity IRepository<TEntity>.Update(TEntity entity)
        {
            return _dbSet.Update(entity).Entity;
        }

        public async Task<PaginatedResult<TDto>> GetPagedData<TEntity, TDto>(PaginatedRequest paginatedRequest) where TEntity : Entity
                                                                                                     where TDto : class
        {
            return await _context.Set<TEntity>().CreatePaginatedResultAsync<TEntity, TDto>(paginatedRequest, _mapper);
        }
    }
}
