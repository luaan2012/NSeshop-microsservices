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
        Task<ResponseResult> ApplyVoucheCart(string voucher);

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

        #region Carrinho

        public async Task<CartViewModel> GetCart()
        {
            var response = await _httpClient.GetAsync("/compras/carrinho/");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<CartViewModel>(response);
        }
        public async Task<int> GetQuantitiesCart()
        {
            var response = await _httpClient.GetAsync("/compras/carrinho-quantidade/");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<int>(response);
        }
        public async Task<ResponseResult> AddItemCart(ItemCartViewModel cart)
        {
            var itemContent = GetContent(cart);

            var response = await _httpClient.PostAsync("/compras/carrinho/items/", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
        public async Task<ResponseResult> UpdateItemCart(Guid productId, ItemCartViewModel item)
        {
            var itemContent = GetContent(item);

            var response = await _httpClient.PutAsync($"/compras/carrinho/items/{productId}", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
        public async Task<ResponseResult> RemoveItemCart(Guid productId)
        {
            var response = await _httpClient.DeleteAsync($"/compras/carrinho/items/{productId}");

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
        public async Task<ResponseResult> ApplyVoucheCart(string voucher)
        {
            var itemContent = GetContent(voucher);

            var response = await _httpClient.PostAsync("/compras/carrinho/aplicar-voucher/", itemContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        #endregion

        #region Order

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