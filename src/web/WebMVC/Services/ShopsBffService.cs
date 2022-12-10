using Microsoft.Extensions.Options;
using NS.Core.Communication;
using NS.WebMVC.Extensions;
using NS.WebMVC.Models;

namespace NS.WebMVC.Services
{
    public interface IShopsBffService
    {
        // Carrinho
        Task<CartViewModel> GetCart();
        Task<int> GetQuantitiesCart();
        Task<ResponseResult> AddItemCart(ItemCartViewModel cart);
        Task<ResponseResult> UpdateItemCart(Guid productId, ItemCartViewModel cart);
        Task<ResponseResult> RemoveItemCart(Guid productId);
        Task<ResponseResult> RemoveCart();
        Task<ResponseResult> ApplyVoucheCart(string voucher);

        // Carrinho
        Task<WishListViewModel> GetWishList();
        Task<int> GetQuantitiesWishList();
        Task<ResponseResult> AddItemWishList(ItemWishListViewModel cart);
        Task<ResponseResult> RemoveItemWishList(Guid productId);
        Task<ResponseResult> RemoveWishList();

        // Pedido
        Task<ResponseResult> FinisheOrder(OrderTransactionViewModel orderTransaction);
        Task<OrderViewModel> GetLastOrder();
        Task<IEnumerable<OrderViewModel>> GetListByClientId();
        OrderTransactionViewModel MapForOrder(CartViewModel cart, AddressViewModel address);
    }

    public class ShopsBffService : Service, IShopsBffService
    {
        private readonly HttpClient _httpClient;

        public ShopsBffService(HttpClient httpClient, IOptions<AppSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.ShopsBffUrl);
        }

        #region [Carrinho]

        public async Task<CartViewModel> GetCart()
        {
            var response = await _httpClient.GetAsync("/shops/cart/");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<CartViewModel>(response);
        }
        public async Task<int> GetQuantitiesCart()
        {
            var response = await _httpClient.GetAsync("/shops/cart-quantity");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<int>(response);
        }
        public async Task<ResponseResult> AddItemCart(ItemCartViewModel cart)
        {
            var itemContent = GetContent(cart);

            var response = await _httpClient.PostAsync("/shops/cart/items/", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
        public async Task<ResponseResult> UpdateItemCart(Guid productId, ItemCartViewModel item)
        {
            var itemContent = GetContent(item);

            var response = await _httpClient.PutAsync($"/shops/cart/items/{productId}", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
        public async Task<ResponseResult> RemoveItemCart(Guid productId)
        {
            var response = await _httpClient.DeleteAsync($"/shops/cart/items/{productId}");

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveCart()
        {
            var response = await _httpClient.DeleteAsync($"/shops/cart/removeCart");

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> ApplyVoucheCart(string voucher)
        {
            var itemContent = GetContent(voucher);

            var response = await _httpClient.PostAsync("/shops/cart/apply-voucher/", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        #endregion

        #region [WishList]
        public async Task<WishListViewModel> GetWishList()
        {
            var response = await _httpClient.GetAsync("/shops/wishlist");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<WishListViewModel>(response);
        }

        public async Task<int> GetQuantitiesWishList()
        {
           var response = await _httpClient.GetAsync("/shops/wishlist-quantity");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<int>(response);
        }

        public async Task<ResponseResult> AddItemWishList(ItemWishListViewModel cart)
        {
            var itemContent = GetContent(cart);

            var response = await _httpClient.PostAsync("/shops/wishlist/items/", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveItemWishList(Guid productId)
        {
            var response = await _httpClient.DeleteAsync($"/shops/wishlist/items/{productId}");

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveWishList()
        {
            var response = await _httpClient.DeleteAsync($"/shops/wishlist/removeWishList");

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
        #endregion

        #region [Order]

        public async Task<ResponseResult> FinisheOrder(OrderTransactionViewModel orderTransaction)
        {
            var orderContent = GetContent(orderTransaction);

            var response = await _httpClient.PostAsync("/compras/pedido/", orderContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<OrderViewModel> GetLastOrder()
        {
            var response = await _httpClient.GetAsync("/compras/pedido/ultimo/");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<OrderViewModel>(response);
        }

        public async Task<IEnumerable<OrderViewModel>> GetListByClientId()
        {
            var response = await _httpClient.GetAsync("/compras/pedido/lista-cliente/");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<IEnumerable<OrderViewModel>>(response);
        }

        public OrderTransactionViewModel MapForOrder(CartViewModel cart, AddressViewModel address)
        {
            var order = new OrderTransactionViewModel
            {
                ValueTotal = cart.ValueTotal,
                Items = cart.Items,
                Discount = cart.Discount,
                VoucherUsed = cart.VoucherUsed,
                VoucherCode = cart.Voucher?.Code
            };

            if (address != null)
            {
                order.Address = new AddressViewModel
                {
                    PublicPlace = address.PublicPlace,
                    Number = address.Number,
                    Neighborhood = address.Neighborhood,
                    Cep = address.Cep,
                    Complement = address.Complement,
                    City = address.City,
                    State = address.State
                };
            }

            return order;
        }        
        #endregion
    }
}