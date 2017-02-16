using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Repositories.Category;
using Zamin.Repositories.Users;

//using Zamin.Repositories.Users;

namespace Zamin.Repositories
{
    public class UnitOfWork : UnitOfWorkBase<DataContext>
    {
        private IUsersRepository _usersRepository;
        public IUsersRepository UsersRepository
        {
            get { return _usersRepository ?? (_usersRepository = new UsersRepository(DataContext)); }
        }

        private ICourseRepository _courseRepository;
        public ICourseRepository CourseRepository
        {
            get { return _courseRepository ?? (_courseRepository = new CourseRepository(DataContext)); }
        }

        private ICategoryRepository _categoryRepository;
        public ICategoryRepository CategoryRepository
        {
            get { return _categoryRepository ?? (_categoryRepository = new CategoryRepository(DataContext)); }
        }

        private ITagRepository _tagRepository;
        public ITagRepository TagRepository
        {
            get { return _tagRepository ?? (_tagRepository = new TagRepository(DataContext)); }
        }

      
    }
}
