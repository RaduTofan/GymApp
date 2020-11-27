using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.API.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void Remove(TEntity entity);
        TEntity Get(long id);
        IQueryable<TEntity> GetAll();
        TEntity Update(TEntity entity);
        void Save();
    }
}
