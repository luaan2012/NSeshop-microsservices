using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace NS.WebMVC.Extensions
{
    public class CartViewComponent : ViewComponent
    {
        private readonly IShopsBffService _shopsBffService;

        public CartViewComponent(IShopsBffService shopBffService)
        {
            _shopsBffService = shopBffService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View(await _shopsBffService.GetQuantitiesCart());
        }
    }
}