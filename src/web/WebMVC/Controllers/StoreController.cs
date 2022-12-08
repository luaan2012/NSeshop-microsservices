using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace WebMVC.Controllers
{
    [Authorize]
    public class StoreController : Controller       
    {
        private readonly ICatalogService _catalogService;

        public StoreController(ICatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        [Route("loja")]
        public async Task<IActionResult> Index(Guid id, string search)
        {
            TempData["openProduct"] = id;

            TempData["searchProduct"] = search;

            return View(await _catalogService.GetAll());
        }
        
        [Route("loja/{id:guid}")]
        public async Task<IActionResult> ProductDetails(Guid id)
        {
            var product = await _catalogService.GetById(id);

            if (product is null)
                return NotFound();

            return Json(product);
        }
    }
}
