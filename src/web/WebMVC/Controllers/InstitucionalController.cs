using Microsoft.AspNetCore.Mvc;

namespace WebMVC.Controllers
{
    public class InstitucionalController : Controller
    {
        public IActionResult Blog()
        {
            return View();
        }
        public IActionResult Sobre()
        {
            return View();
        }

        public IActionResult Contato()
        {
            return View();
        }
    }
}
