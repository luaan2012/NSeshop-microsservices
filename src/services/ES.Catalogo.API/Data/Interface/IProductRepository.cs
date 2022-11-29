using NS.Catalog.API.Models;
using NS.Catalogo.API.Models;
using NS.Core.Data;

namespace NS.Catalogo.API.Data.Interface
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedResult<Product>> GiveAll(int pageSize, int pageIndex, string query = null);
        Task<Product> GetById(Guid id);
        Task<List<Product>> GetProductsById(string ids);
        Task<List<Product>> GetAll();
        void Add(Product product);
        void Update(Product product);
    }
}
