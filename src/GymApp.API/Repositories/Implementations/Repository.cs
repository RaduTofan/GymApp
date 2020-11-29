using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using GymApp.API;
using GymApp.Domain;
using GymApp.API.Repositories.Interfaces;
using System.Linq.Expressions;

namespace GymApp.API.Repositories.Implementations
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        private readonly GymAppDbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public Repository(GymAppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
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
            return _dbSet.FirstOrDefault(x => x.Id == id);
        }
        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.FirstOrDefault(predicate);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet.OrderByDescending(x => x.Id);
        }

        TEntity IRepository<TEntity>.Update(TEntity entity)
        {
            return _dbSet.Update(entity).Entity;
        }

       
    }
}
