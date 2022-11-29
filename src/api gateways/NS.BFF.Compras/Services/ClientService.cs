using System.Net;
using Microsoft.Extensions.Options;
using NS.BFF.Compras.Extensions;
using NS.BFF.Compras.Models;
using NS.BFF.Compras.Services;

namespace NS.Bff.Compras.Services
{
    public interface IClientService
    {
        Task<AddressDTO> GetAddress();
    }

    public class ClientService : Service, IClientService
    {
        private readonly HttpClient _httpClient;

        public ClientService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.ClientUrl);
        }

        public async Task<AddressDTO> GetAddress()
        {
            var response = await _httpClient.GetAsync("/client/address/");

            if (response.StatusCode == HttpStatusCode.NotFound) return null;

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<AddressDTO>(response);
        }
    }
}