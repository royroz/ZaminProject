using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models;
namespace Zamin.Repositories
{
    public abstract class UnitOfWorkBase<C> : IDisposable
    where C : DbContext, IDisposedTracker, new()
    {
        protected C DataContext = new C();

        public OperationStatus Save()
        {
            var opStatus = new OperationStatus { Success = true };

            try
            {
                opStatus.Success = DataContext.SaveChanges() > 0;
            }
            catch (Exception exp)
            {
                opStatus = OperationStatus.CreateFromException("Error saving.", exp);
            }

            return opStatus;
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    DataContext.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

}
