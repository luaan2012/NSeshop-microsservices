using Microsoft.AspNetCore.Mvc;

namespace NS.WebMVC.Extensions
{
    public class SummaryViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}