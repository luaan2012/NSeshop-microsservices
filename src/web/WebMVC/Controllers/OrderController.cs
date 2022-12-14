using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;
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

        [HttpPost]
        [Route("finalizar-pedido")]
        public async Task<IActionResult> FinishOrder(OrderTransactionViewModel orderTransaction)
        {
            if (!ModelState.IsValid) return View("Index", _shopsBffService.MapForOrder(
                await _shopsBffService.GetCart(), null));

            var response = await _shopsBffService.FinisheOrder(orderTransaction);

            if (ResponseHasError(response))
            {
                var cart = await _shopsBffService.GetCart();
                if (cart.Items.Count == 0) return RedirectToAction("Index", "Carrinho");

                var orderMap = _shopsBffService.MapForOrder(cart, null);

                return View("Index", orderMap);
            }

            return RedirectToAction("OrderFinished");
        }

        [HttpGet]
        [Route("pedido-concluido")]
        public async Task<IActionResult> OrderFinished()
        {
            var response = await _shopsBffService.GetLastOrder();

            if (response.OrderItems.Count == 0 ) return RedirectToAction("Index", "Store");

            return View("OrderFinished", response);
        }

        [HttpGet("meus-pedidos")]
        public async Task<IActionResult> MyOrders()
        {
            return View(await _shopsBffService.GetListByClientId());
        }
    }
}
