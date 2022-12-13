using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.WebMVC.Models;
using NS.WebMVC.Services;

namespace NS.WebMVC.Controllers
{
    [Authorize]
    public class CartController : MainController
    {
        private readonly IShopsBffService _shopsBffService;
        private readonly IClientService _clientService;

        public CartController(IShopsBffService shopsBffService, IClientService clientService)
        {
            _shopsBffService = shopsBffService;
            _clientService = clientService;
        }

        public async Task<IActionResult> Index()
        {
            var cart = await _shopsBffService.GetCart();

            if(cart?.Items?.Count <= 0)
            {
                TempData["CartEmpty"] = "true";

                return RedirectToAction("Index", "Store");
            }

            TempData["address"] = await _clientService.GetAddress();

            return View(await _shopsBffService.GetCart());
        }

        [HttpPost]
        [Route("cart/add-item")]
        public async Task<IActionResult> AddItemCart(ItemCartViewModel itemCart)
        {
            var response = await _shopsBffService.AddItemCart(itemCart);

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            return Ok();
        }

        [HttpPost]
        [Route("cart/update-item")]
        public async Task<IActionResult> UpdateItemCart(Guid id, int quantity)
        {
            var response = await _shopsBffService.UpdateItemCart(id, new ItemCartViewModel { ProductId = id, Quantity = quantity});

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            return Ok();
        }

        [HttpPost]
        [Route("cart/removeItem")]
        public async Task<IActionResult> RemoveCart(Guid id)
        {
            var response = await _shopsBffService.RemoveItemCart(id);

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            TempData["openCart"] = true;

            return Ok();
        }

        [HttpPost]
        [Route("cart/RemoveCart")]
        public async Task<IActionResult> RemoveCart()
        {
            var response = await _shopsBffService.RemoveCart();

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            return RedirectToAction("Index", "Store");
        }

        [HttpPost]
        [Route("cart/apply-voucher")]
        public async Task<IActionResult> ApplyVoucher(string voucherCode)
        {
            var response = await _shopsBffService.ApplyVoucheCart(voucherCode);

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            return RedirectToAction("Index");
        }

        [HttpPost]
        [Route("cart/remove-voucher")]
        public async Task<IActionResult> RemoveVoucher(string voucherCode)
        {
            var response = await _shopsBffService.RemoveVoucheCart(voucherCode);

            if (ResponseHasError(response)) return BadRequest(response.Errors.Messages);

            return RedirectToAction("Index");
        }
    }
}
