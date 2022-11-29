using Microsoft.Extensions.Options;
using NS.BFF.Compras.Extensions;
using NS.BFF.Compras.Models;

namespace NS.BFF.Compras.Services
{
    public interface ICatalogService
    {
        Task<ItemProductDTO> GetById(Guid id);
        Task<IEnumerable<ItemProductDTO>> GetItems(IEnumerable<Guid> ids);
    }

    public class CatalogService : Service, ICatalogService
    {
        private readonly HttpClient _httpClient;

        public CatalogService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.CatalogUrl);
        }

        public async Task<ItemProductDTO> GetById(Guid id)
        {
            var response = await _httpClient.GetAsync($"/catalog/products/{id}");

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<ItemProductDTO>(response);
        }

        public async Task<IEnumerable<ItemProductDTO>> GetItems(IEnumerable<Guid> ids)
        {
            var idsRequest = string.Join(",", ids);

            var response = await _httpClient.GetAsync($"/catalog/products/list/{idsRequest}/");

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<IEnumerable<ItemProductDTO>>(response);
        }
    }
}