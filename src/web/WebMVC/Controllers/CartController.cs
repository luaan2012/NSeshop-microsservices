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
        public async Task<IActionResult> AdicionarItemCarrinho(Guid id, int quantity)
        {
            //var resposta = await _shopsBffService.AddItemCart(itemCart);

            //if (ResponseHasError(resposta)) return View("Index", await _shopsBffService.GetCart());

            return RedirectToAction("Index");
        }
    }
}
