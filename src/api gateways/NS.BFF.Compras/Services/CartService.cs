using Microsoft.Extensions.Options;
using NS.BFF.Compras.Extensions;
using NS.BFF.Compras.Models;
using NS.Core.Communication;

namespace NS.BFF.Compras.Services
{
    public interface ICartService
    {
        Task<CartDTO> GetCart();
        Task<ResponseResult> AddItemCart(ItemCartDTO product);
        Task<ResponseResult> UpdateItemCart(Guid productId, ItemCartDTO cart);
        Task<ResponseResult> RemoveItemCart(Guid productId);
        Task<ResponseResult> RemoveCart();
        Task<ResponseResult> ApplyVoucherCart(VoucherDTO voucher);
    }

    public class CartService : Service, ICartService
    {
        private readonly HttpClient _httpClient;

        public CartService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.CartUrl);
        }

        public async Task<CartDTO> GetCart()
        {
            var response = await _httpClient.GetAsync("/cart/");

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<CartDTO>(response);
        }

        public async Task<ResponseResult> AddItemCart(ItemCartDTO product)
        {
            var itemContent = GetContent(product);

            var response = await _httpClient.PostAsync("/cart/", itemContent);

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> UpdateItemCart(Guid productId, ItemCartDTO cart)
        {
            var itemContent = GetContent(cart);

            var response = await _httpClient.PutAsync($"/cart/{cart.ProductId}", itemContent);

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveItemCart(Guid productId)
        {
            var response = await _httpClient.DeleteAsync($"/cart/{productId}");

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveCart()
        {
            var response = await _httpClient.DeleteAsync($"/cart/removeCart");

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> ApplyVoucherCart(VoucherDTO voucher)
        {
            var itemContent = GetContent(voucher);

            var response = await _httpClient.PostAsync("/carrinho/aplicar-voucher/", itemContent);

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
    }
}