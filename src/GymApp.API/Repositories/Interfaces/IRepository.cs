using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using GymApp.API.Infrastructure.Models;
using GymApp.Domain;

namespace GymApp.API.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void Remove(TEntity entity);
        TEntity Get(long id);
        TEntity Get(Expression<Func<TEntity, bool>> predicate);
        IQueryable<TEntity> GetAll();
        TEntity Update(TEntity entity);
        void Save();
        Task<PaginatedResult<TDto>> GetPagedData<TEntity, TDto>(PaginatedRequest paginatedRequest) where TEntity : Entity
                                                                                             where TDto : class;
    }
}
