using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace NS.WebMVC.Extensions
{
    public class WishListModalViewComponent : ViewComponent
    {
        private readonly IShopsBffService _shopsBffService;

        public WishListModalViewComponent(IShopsBffService shopBffService)
        {
            _shopsBffService = shopBffService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View(await _shopsBffService.GetWishList());
        }
    }
}