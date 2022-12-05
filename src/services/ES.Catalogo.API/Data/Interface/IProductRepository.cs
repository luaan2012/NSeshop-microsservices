using NS.Catalog.API.Models;
using NS.Catalogo.API.Models;
using NS.Core.Data;

namespace NS.Catalogo.API.Data.Interface
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<PagedResult<Product>> GiveAll(int pageSize, int pageIndex, string query = null);
        Task<List<Product>> GetAll();
        Task<List<Product>> GetHighLighted();
        Task<Product> GetById(Guid id);
        Task<List<Product>> GetProductsById(string ids);
        void Add(Product product);
        void Update(Product product);
    }
}
