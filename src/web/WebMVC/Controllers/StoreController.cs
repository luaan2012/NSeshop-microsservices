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
        public async Task<IActionResult> Index()
        {            
            return View(await _catalogService.GetAll());
        }
    }
}
