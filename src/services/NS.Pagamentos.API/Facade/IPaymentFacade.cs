using NS.Pagamentos.API.Models;

namespace NS.Pagamentos.Facade
{
    public interface IPaymentFacade
    {
        Task<Transactions> AuthorizePayment(Payment payment);
        Task<Transactions> CatchPayment(Transactions transaction);
        Task<Transactions> CancelAuthorized(Transactions transaction);
    }
}