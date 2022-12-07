using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace NS.WebMVC.Extensions
{
    public class CartModalViewComponent : ViewComponent
    {
        private readonly IShopsBffService _shopsBffService;

        public CartModalViewComponent(IShopsBffService shopBffService)
        {
            _shopsBffService = shopBffService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View(await _shopsBffService.GetCart());
        }
    }
}