using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;

namespace NS.WebApp.MVC.Extensions
{
    public class PaginationViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(IPagedList modelPagination)
        {
            return View(modelPagination);
        }
    }
}