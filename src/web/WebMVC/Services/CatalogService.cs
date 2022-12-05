using Microsoft.Extensions.Options;
using NS.WebMVC.Extensions;
using NS.WebMVC.Models;

namespace NS.WebMVC.Services
{
    public interface ICatalogService
    {
        Task<PagedViewModel<ProductViewModel>> GetAll(int pageSize, int pageIndex, string query = null);
        Task<IEnumerable<ProductViewModel>> GetAll();
        Task<IEnumerable<ProductViewModel>> GetHighLighted();
        Task<ProductViewModel> GetById(Guid id);
    }
    public class CatalogService : Service, ICatalogService
    {
        private readonly HttpClient _httpClient;

        public CatalogService(HttpClient httpClient,
            IOptions<AppSettings> settings)
        {
            httpClient.BaseAddress = new Uri(settings.Value.CatalogUrl);

            _httpClient = httpClient;
        }

        public async Task<ProductViewModel> GetById(Guid id)
        {
            var response = await _httpClient.GetAsync($"/catalog/products/{id}");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<ProductViewModel>(response);
        }

        public async Task<IEnumerable<ProductViewModel>> GetAll()
        {
            var response = await _httpClient.GetAsync($"/catalog/products/list");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<IEnumerable<ProductViewModel>>(response);
        }

        public async Task<IEnumerable<ProductViewModel>> GetHighLighted()
        {
            var response = await _httpClient.GetAsync($"/catalog/products/highlighted");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<IEnumerable<ProductViewModel>>(response);
        }

        public async Task<PagedViewModel<ProductViewModel>> GetAll(int pageSize, int pageIndex, string query = null)
        {
            var response = await _httpClient.GetAsync($"/catalog/products?ps={pageSize}&page={pageIndex}&q={query}");

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<PagedViewModel<ProductViewModel>>(response);
        }
    }
}