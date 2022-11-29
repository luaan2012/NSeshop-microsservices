using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.Catalog.API.Models;
using NS.Catalogo.API.Data.Interface;
using NS.Catalogo.API.Models;

namespace NS.Catalogo.API.Controllers
{
    public class CatalogController : MainController
    {
        private readonly IProductRepository _productRepository;

        public CatalogController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet("catalog/products/list")]
        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _productRepository.GetAll();
        }

        [HttpGet("catalog/products")]
        public async Task<PagedResult<Product>> Index([FromQuery] int ps = 8, [FromQuery] int page = 1, [FromQuery] string q = null)
        {
            return await _productRepository.GiveAll(ps, page, q);
        }
        [Authorize]
        [HttpGet("catalog/products/{id}")]
        public async Task<Product> DetailProduct(Guid id)
        {
            return await _productRepository.GetById(id);
        }

        [HttpGet("catalog/products/list/{ids}")]
        public async Task<IEnumerable<Product>> GiveProductById(string ids)
        {
            return await _productRepository.GetProductsById(ids);
        }
    }
}