using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;
using NS.WebMVC.Services;

namespace NS.WebMVC.Controllers
{
    public class WishListController : MainController
    {
        private readonly IShopsBffService _shopsBffService;

        public WishListController(IShopsBffService shopsBffService)
        {
            _shopsBffService = shopsBffService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("wishlist/add-item")]
        public async Task<IActionResult> AddItemWishList(ItemWishListViewModel itemWish)
        {
            var resposta = await _shopsBffService.AddItemWishList(itemWish);

            if (ResponseHasError(resposta)) return BadRequest(resposta.Errors.Messages);

            return Ok();
        }

        [HttpPost]
        [Route("wishlist/RemoveCart")]
        public async Task<IActionResult> RemoveWishList()
        {
            var resposta = await _shopsBffService.RemoveCart();

            if (ResponseHasError(resposta)) return BadRequest(resposta.Errors.Messages);

            return RedirectToAction("Index", "Store");
        }
    }
}
