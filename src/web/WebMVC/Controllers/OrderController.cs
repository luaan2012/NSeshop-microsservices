using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Services;

namespace NS.WebMVC.Controllers
{
    public class OrderController : MainController
    {
        private readonly IClientService _clientService;
        private readonly IShopsBffService _shopsBffService;

        public OrderController(IShopsBffService shopsBffService, IClientService clientService)
        {
            _shopsBffService = shopsBffService;
            _clientService = clientService;
        }

        public async Task<IActionResult> Index()
        {
            var cart = await _shopsBffService.GetCart();
            if (cart.Items.Count == 0) return RedirectToAction("Index", "Cart");

            var address = await _clientService.GetAddress();

            var order = _shopsBffService.MapForOrder(cart, address);

            return View(order);
        }
    }
}
