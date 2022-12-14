using NS.Core.Messages.Integration;
using NS.Pagamentos.API.Models;

namespace NS.Pagamentos.API.Services
{
    public interface IPaymentService
    {
        Task<ResponseMessage> AuthorizePayment(Payment payment);
        Task<ResponseMessage> CatchPayment(Guid orderId);
        Task<ResponseMessage> CancelPayment(Guid orderId);
    }
}