using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace WebMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ICatalogService _catalogService;

        public HomeController(ILogger<HomeController> logger, ICatalogService catalogService)
        {
            _logger = logger;
            _catalogService = catalogService;
        }

        public async Task<IActionResult> Index(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;

            var products = await _catalogService.GetHighLighted();
            return View(products);
        }

        public IActionResult Privacy()
        {
            return View();
        }
    }
}