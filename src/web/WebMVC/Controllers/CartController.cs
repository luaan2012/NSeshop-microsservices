using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;
using NS.WebMVC.Services;

namespace NS.WebMVC.Controllers
{
    public class CartController : MainController
    {
        private readonly IShopsBffService _shopsBffService;

        public CartController(IShopsBffService shopsBffService)
        {
            _shopsBffService = shopsBffService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("cart/add-item")]
        public async Task<IActionResult> AddItemCart(ItemCartViewModel itemCart)
        {
            var resposta = await _shopsBffService.AddItemCart(itemCart);

            if (ResponseHasError(resposta)) return BadRequest(resposta.Errors.Messages);

            return Ok();
        }

        [HttpPost]
        [Route("cart/RemoveCart")]
        public async Task<IActionResult> RemoveCart()
        {
            var resposta = await _shopsBffService.RemoveCart();

            if (ResponseHasError(resposta)) return BadRequest(resposta.Errors.Messages);

            return RedirectToAction("Index", "Store");
        }
    }
}
