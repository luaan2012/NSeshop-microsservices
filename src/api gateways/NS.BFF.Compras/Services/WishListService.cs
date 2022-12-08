using Microsoft.Extensions.Options;
using NS.BFF.Compras.Extensions;
using NS.BFF.Compras.Models;
using NS.Core.Communication;

namespace NS.BFF.Compras.Services
{

    public interface IWishListService
    {
        Task<WishListDTO> GetWishList();
        Task<ResponseResult> AddItemWishList(ItemWishListDTO product);
        Task<ResponseResult> RemoveItemWishList(Guid productId);
        Task<ResponseResult> RemoveWishList();
    }

    public class WishListService : Service, IWishListService
    {
        private readonly HttpClient _httpClient;

        public WishListService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.CartUrl);
        }

        public async Task<WishListDTO> GetWishList()
        {
            var response = await _httpClient.GetAsync("/wishlist/");

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<WishListDTO>(response);
        }

        public async Task<ResponseResult> AddItemWishList(ItemWishListDTO product)
        {
            var itemContent = GetContent(product);

            var response = await _httpClient.PostAsync("/wishlist/", itemContent);

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveItemWishList(Guid productId)
        {
            var response = await _httpClient.DeleteAsync($"/wishlist/{productId}");

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<ResponseResult> RemoveWishList()
        {
            var response = await _httpClient.DeleteAsync($"/wishlist/removeWishList");

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
    }

}
