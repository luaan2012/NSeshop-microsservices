using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NS.ApiCore.Controllers;
using NS.BFF.Compras.Models;
using NS.BFF.Compras.Services;

namespace NS.BFF.Compras.Controllers
{
    [Authorize]
    public class WishListController : MainController
    {
        private readonly IWishListService _wishListService;
        //private readonly ICartGrpcService _cartGrpcService;
        private readonly ICatalogService _catalogService;
        private readonly IOrderService _orderService;

        public WishListController(
            IWishListService wishListService,
            //ICartGrpcService cartGrpcService,
            ICatalogService catalogService,
            IOrderService orderService)
        {
            _wishListService = wishListService;
            //_cartGrpcService = cartGrpcService;
            _catalogService = catalogService;
            _orderService = orderService;
        }

        [HttpGet]
        [Route("shops/wishlist")]
        public async Task<IActionResult> Index()
        {
            return CustomResponse(await _wishListService.GetWishList());
        }

        [HttpGet]
        [Route("shops/wishlist-quantity")]
        public async Task<int> GetQuantityWishList()
        {
            var quantity = await _wishListService.GetWishList();
            return quantity?.Items.Sum(i => i.Quantity) ?? 0;
        }

        [HttpPost]
        [Route("shops/wishlist/items")]
        public async Task<IActionResult> AddItemCart(ItemWishListDTO itemProduct)
        {
            var product = await _catalogService.GetById(itemProduct.ProductId);

            await ValidateItemCart(product, itemProduct.Quantity, true);
            if (!ValidOperation()) return CustomResponse();

            itemProduct.Name = product.Name;
            itemProduct.Image = product.Image;

            var resposta = await _wishListService.AddItemWishList(itemProduct);

            return CustomResponse(resposta);
        }

        [HttpDelete]
        [Route("shops/wishlist/items/{productId}")]
        public async Task<IActionResult> RemoveItemCart(Guid productId)
        {
            var product = await _catalogService.GetById(productId);

            if (product == null)
            {
                AddErrorProcessing("Produto inexistente!");
                return CustomResponse();
            }

            var response = await _wishListService.RemoveItemWishList(productId);

            return CustomResponse(response);
        }

        [HttpDelete]
        [Route("shops/wishlist/removeWishList")]
        public async Task<IActionResult> RemoveCart()
        {

            var response = await _wishListService.RemoveWishList();

            return CustomResponse(response);
        }

        private async Task ValidateItemCart(ItemProductDTO product, int quantity, bool addProduct = false)
        {
            if (product == null) AddErrorProcessing("Produto inexistente!");

            if (quantity < 1) AddErrorProcessing($"Escolha ao menos uma unidade do produto {product.Name}");

            var cart = await _wishListService.GetWishList();

            var itemWishList = cart.Items.FirstOrDefault(p => p.ProductId == product.Id);

            if (itemWishList != null && addProduct && itemWishList.Quantity > 1)
            {
                AddErrorProcessing($"O produto {product.Name} já está na sua Lista de Desejos");
                return;
            }

            if (quantity > 1) AddErrorProcessing($"O produto {product.Name} já está na sua Lista de Desejos");
        }
    }
}
