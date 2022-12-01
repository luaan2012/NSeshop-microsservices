using Microsoft.AspNetCore.Mvc;

namespace WebMVC.Controllers
{
    public class LojaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
