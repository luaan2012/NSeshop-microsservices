using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace WebMVC.Controllers
{
    [Authorize]
    public class StoreController : Controller       
    {
        private readonly ICatalogService _catalogService;
        private readonly IShopsBffService _shopsService;

        public StoreController(IShopsBffService shopsService, ICatalogService catalogService)
        {
            _shopsService = shopsService;
            _catalogService = catalogService;
        }

        //[HttpGet]
        //[Route("loja")]
        //public async Task<IActionResult> Index([FromQuery] int ps = 8, [FromQuery] int page = 1, [FromQuery] string q = null)
        //{
        //    var products = await _catalogService.GetAll(ps, page, q);

        //    ViewBag.Pesquisa = q;

        //    products.ReferenceAction = "Index";

        //    return View(products);
        //}

        [Route("loja")]
        public async Task<IActionResult> Index(Guid id, string search)
        {
            TempData["openProduct"] = id;

            TempData["searchProduct"] = search;

            ViewBag.WishList = await _shopsService.GetWishList();

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
