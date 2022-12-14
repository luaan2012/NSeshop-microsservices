using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.BFF.Compras.Models;
using NS.BFF.Compras.Services;
using NS.BFF.Compras.Services.gRPC;

namespace NS.BFF.Compras.Controllers
{
    [Authorize]
    public class CartController : MainController
    {
        private readonly ICartService _cartService;
        private readonly ICartGrpcService _cartGrpcService;
        private readonly ICatalogService _catalogService;
        private readonly IOrderService _orderService;

        public CartController(
            ICartService cartService,
            ICartGrpcService cartGrpcService,
            ICatalogService catalogService,
            IOrderService orderService)
        {
            _cartService = cartService;
            _cartGrpcService = cartGrpcService;
            _catalogService = catalogService;
            _orderService = orderService;
        }

        [HttpGet]
        [Route("shops/cart")]
        public async Task<IActionResult> Index()
        {
            return CustomResponse(await _cartGrpcService.GetCart());
        }

        [HttpGet]
        [Route("shops/cart-quantity")]
        public async Task<int> ObterQuantidadeCarrinho()
        {
            var quantity = await _cartGrpcService.GetCart();
            return quantity?.Items.Sum(i => i.Quantity) ?? 0;
        }

        [HttpPost]
        [Route("shops/cart/items")]
        public async Task<IActionResult> AddItemCart(ItemCartDTO itemProduct)
        {
            var product = await _catalogService.GetById(itemProduct.ProductId);

            await ValidateItemCart(product, itemProduct.Quantity, true);
            if (!ValidOperation()) return CustomResponse();

            itemProduct.Name = product.Name;
            itemProduct.Value = product.Value;
            itemProduct.Image = product.Image;

            var resposta = await _cartService.AddItemCart(itemProduct);

            return CustomResponse(resposta);
        }

        [HttpPut]
        [Route("shops/cart/items/{productId}")]
        public async Task<IActionResult> UpdateItemCart(Guid productId, ItemCartDTO itemProduct)
        {
            var product = await _catalogService.GetById(productId);

            await ValidateItemCart(product, itemProduct.Quantity);
            if (!ValidOperation()) return CustomResponse();

            var response = await _cartService.UpdateItemCart(productId, itemProduct);

            return CustomResponse(response);
        }

        [HttpDelete]
        [Route("shops/cart/items/{productId}")]
        public async Task<IActionResult> RemoveItemCart(Guid productId)
        {
            var product = await _catalogService.GetById(productId);

            if (product == null)
            {
                AddErrorProcessing("Produto inexistente!");
                return CustomResponse();
            }

            var response = await _cartService.RemoveItemCart(productId);

            return CustomResponse(response);
        }

        [HttpDelete]
        [Route("shops/cart/removeCart")]
        public async Task<IActionResult> RemoveCart()
        {

            var response = await _cartService.RemoveCart();

            return CustomResponse(response);
        }

        [HttpPost]
        [Route("shops/cart/apply-voucher")]
        public async Task<IActionResult> ApplyVoucher([FromBody] string voucherCode)
        {
            var voucher = await _orderService.GetVoucherByCode(voucherCode);
            if (voucher is null)
            {
                AddErrorProcessing("Voucher inválido ou não encontrado!");
                return CustomResponse();
            }

            var response = await _cartService.ApplyVoucherCart(voucher);

            return CustomResponse(response);
        }

        [HttpPost]
        [Route("shops/cart/remove-voucher")]
        public async Task<IActionResult> RemoveVoucher([FromBody] string voucherCode)
        {
            var voucher = await _orderService.GetVoucherByCode(voucherCode);

            if (voucher is null)
            {
                AddErrorProcessing("Voucher inválido ou não encontrado!");
                return CustomResponse();
            }

            var response = await _cartService.RemoveVoucherCart(voucher);

            return CustomResponse(response);
        }

        private async Task ValidateItemCart(ItemProductDTO product, int quantity, bool addProduct = false)
        {
            if (product == null) AddErrorProcessing("Produto inexistente!");

            if (quantity < 1) AddErrorProcessing($"Escolha ao menos uma unidade do produto {product.Name}");

            var cart = await _cartService.GetCart();
            var itemCart = cart.Items.FirstOrDefault(p => p.ProductId == product.Id);

            if (itemCart != null && addProduct && itemCart.Quantity + quantity > product.QuantityStock)
            {
                AddErrorProcessing($"O produto {product.Name} possui {product.QuantityStock} unidades em estoque, contando com o que você possui no carrinho, somam {product.QuantityStock + quantity}");
                return;
            }

            if (quantity > product.QuantityStock) AddErrorProcessing($"O produto {product.Name} possui {product.QuantityStock} unidades em estoque, você selecionou {quantity}");
        }
    }
}
