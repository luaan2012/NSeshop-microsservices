using System.Globalization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.Bff.Compras.Services;
using NS.BFF.Compras.Models;
using NS.BFF.Compras.Services;

namespace NS.BFF.Compras.Controllers
{
    [Authorize]
    public class OrderController : MainController
    {
        private readonly ICatalogService _catalogService;
        private readonly ICartService _cartService;
        private readonly IOrderService _orderService;
        private readonly IClientService _clientService;

        public OrderController(
            ICatalogService catalogService,
            ICartService cartService,
            IOrderService orderService,
            IClientService clientService)
        {
            _catalogService = catalogService;
            _cartService = cartService;
            _orderService = orderService;
            _clientService = clientService;
        }

        [HttpPost]
        [Route("shops/order")]
        [AllowAnonymous]
        public async Task<IActionResult> AddOrder(OrderDTO pedido)
        {
            var cart = await _cartService.GetCart();
            var products = await _catalogService.GetItems(cart.Items.Select(p => p.ProductId));
            var address = await _clientService.GetAddress();

            if (!await ValidadeCartClient(cart, products)) return CustomResponse();

            PopularRequestData(cart, address, pedido);

            return CustomResponse(await _orderService.FinalizeOrder(pedido));
        }

        [HttpGet("shops/order/last")]
        public async Task<IActionResult> LastOrder()
        {
            var order = await _orderService.GetLastOrder();
            if (order is null)
            {
                AddErrorProcessing("Pedido não encontrado!");
                return CustomResponse();
            }

            return CustomResponse(order);
        }

        [HttpGet("shops/order/list-client")]
        public async Task<IActionResult> ListByClient()
        {
            var orders = await _orderService.GetListByClient();

            return orders == null ? NotFound() : CustomResponse(orders);
        }

        private async Task<bool> ValidadeCartClient(CartDTO cart, IEnumerable<ItemProductDTO> products)
        {
            if (cart.Items.Count != products.Count())
            {
                var itemsUnavailable = cart.Items.Select(c => c.ProductId).Except(products.Select(p => p.Id)).ToList();

                foreach (var itemId in itemsUnavailable)
                {
                    var itemCart = cart.Items.FirstOrDefault(c => c.ProductId == itemId);
                    AddErrorProcessing($"O item {itemCart.Name} não está mais disponível no catálogo, o remova do carrinho para prosseguir com a compra");
                }

                return false;
            }

            foreach (var itemCart in cart.Items)
            {
                var productCatalog = products.FirstOrDefault(p => p.Id == itemCart.ProductId);

                if (productCatalog.Value != itemCart.Value)
                {
                    var msgErro = $"O produto {itemCart.Name} mudou de valor (de: " +
                                  $"{string.Format(CultureInfo.GetCultureInfo("pt-BR"), "{0:C}", itemCart.Value)} para: " +
                                  $"{string.Format(CultureInfo.GetCultureInfo("pt-BR"), "{0:C}", productCatalog.Value)}) desde que foi adicionado ao carrinho.";

                    AddErrorProcessing(msgErro);

                    var responseRemove = await _cartService.RemoveItemCart(itemCart.ProductId);
                    if (ResponseHasErrors(responseRemove))
                    {
                        AddErrorProcessing($"Não foi possível remover automaticamente o produto {itemCart.Name} do seu carrinho, _" +
                                                   "remova e adicione novamente caso ainda deseje comprar este item");
                        return false;
                    }

                    itemCart.Value = productCatalog.Value;
                    var responseAdd = await _cartService.AddItemCart(itemCart);

                    if (ResponseHasErrors(responseAdd))
                    {
                        AddErrorProcessing($"Não foi possível atualizar automaticamente o produto {itemCart.Name} do seu carrinho, _" +
                                                   "adicione novamente caso ainda deseje comprar este item");
                        return false;
                    }

                    ClearErrorsProcessing();
                    AddErrorProcessing(msgErro + " Atualizamos o valor em seu carrinho, realize a conferência do pedido e se preferir remova o produto");

                    return false;
                }
            }

            return true;
        }
        
        private void PopularRequestData(CartDTO cart, AddressDTO address, OrderDTO order)
        {
            order.VoucherCode = cart.Voucher?.Code;
            order.VoucherUsed = cart.VoucherUsed;
            order.Valuetotal = cart.ValueTotal;
            order.Discount = cart.Discount;
            order.OrderItems = cart.Items;

            order.Address = address;
        }
    }
}
