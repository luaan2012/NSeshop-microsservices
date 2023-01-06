using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.Catalog.API.Models;
using NS.Catalogo.API.Data.Interface;
using NS.Catalogo.API.Models;
using System.Text.Json;

namespace NS.Catalogo.API.Controllers
{
    [Authorize]
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

        [AllowAnonymous]   
        [HttpGet("catalog/products/highlighted")]
        public async Task<List<HighLighted>> GetHighLighted()
        {
            return JsonSerializer.Deserialize<List<HighLighted>>(JsonSerializer.Serialize(await _productRepository.GetHighLighted())); ;
        }

        [HttpGet("catalog/products")]
        public async Task<PagedResult<Product>> Index([FromQuery] int ps = 8, [FromQuery] int page = 1, [FromQuery] string q = null)
        {
            return await _productRepository.GiveAll(ps, page, q);
        }
        
        [HttpGet("catalog/products/{id}")]
        public async Task<IActionResult> DetailProduct(Guid id)
        {
            var product = await _productRepository.GetById(id);

            if (product is null) AddErrorProcessing("Produto não encontrado");

            return CustomResponse(product);
        }

        [HttpGet("catalog/products/list/{ids}")]
        public async Task<IEnumerable<Product>> GiveProductsById(string ids)
        {
            return await _productRepository.GetProductsById(ids);
        }
    }
}