using Microsoft.AspNetCore.Mvc;

namespace WebMVC.Controllers
{
    public class InstitutionalController : Controller
    {
        [Route("blog")]
        public IActionResult Blog()
        {
            return View();
        }
        [Route("sobre")]
        public IActionResult About()
        {
            return View();
        }
        [Route("contato")]
        public IActionResult Contact()
        {
            return View();
        }
    }
}
