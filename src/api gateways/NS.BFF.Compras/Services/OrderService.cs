using System.Net;
using Microsoft.Extensions.Options;
using NS.BFF.Compras.Extensions;
using NS.BFF.Compras.Models;
using NS.Core.Communication;

namespace NS.BFF.Compras.Services
{
    public interface IOrderService
    {
        Task<ResponseResult> FinalizeOrder(OrderDTO order);
        Task<OrderDTO> GetLastOrder();
        Task<IEnumerable<OrderDTO>> GetListByClient();
        Task<VoucherDTO> GetVoucherByCode(string code);
    }

    public class OrderService : Service, IOrderService
    {
        private readonly HttpClient _httpClient;

        public OrderService(HttpClient httpClient, IOptions<AppServicesSettings> settings)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri(settings.Value.OrderUrl);
        }

        public async Task<ResponseResult> FinalizeOrder(OrderDTO pedido)
        {
            var pedidoContent = GetContent(pedido);

            var response = await _httpClient.PostAsync("/pedido/", pedidoContent);

            if (!HandlerErrorResponse(response)) return await DeserializarObjetoResponse<ResponseResult>(response);

            return ReturnOk();
        }

        public async Task<OrderDTO> GetLastOrder()
        {
            var response = await _httpClient.GetAsync("/pedido/ultimo/");

            if (response.StatusCode == HttpStatusCode.NotFound) return null;

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<OrderDTO>(response);
        }

        public async Task<IEnumerable<OrderDTO>> GetListByClient()
        {
            var response = await _httpClient.GetAsync("/pedido/lista-cliente/");

            if (response.StatusCode == HttpStatusCode.NotFound) return null;

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<IEnumerable<OrderDTO>>(response);
        }

        public async Task<VoucherDTO> GetVoucherByCode(string code)
        {
            var response = await _httpClient.GetAsync($"/voucher/{code}/");

            if (response.StatusCode == HttpStatusCode.NotFound) return null;

            HandlerErrorResponse(response);

            return await DeserializarObjetoResponse<VoucherDTO>(response);
        }
    }
}