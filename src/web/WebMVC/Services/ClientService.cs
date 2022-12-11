using System.Net;
using Microsoft.Extensions.Options;
using NS.Core.Communication;
using NS.WebMVC.Extensions;
using NS.WebMVC.Models;

namespace NS.WebMVC.Services
{
    public interface IClientService
    {
        Task<AddressViewModel> GetAddress();
        Task<ResponseResult> AddAddress(AddressViewModel address);
    }

    public class ClientService : Service, IClientService
    {
        private readonly HttpClient _httpClient;

        public ClientService(HttpClient httpClient, IOptions<AppSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.ClientUrl);
        }

        public async Task<AddressViewModel> GetAddress()
        {
            var response = await _httpClient.GetAsync("/client/address/");

            if (response.StatusCode == HttpStatusCode.NotFound) return null;

            HandleErrosResponse(response);

            return await DeserializarObjetoResponse<AddressViewModel>(response);
        }

        public async Task<ResponseResult> AddAddress(AddressViewModel address)
        {
            var addressContent = GetContent(address);

            var response = await _httpClient.PostAsync("/client/address/", addressContent);

            if (!HandleErrosResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }
    }
}