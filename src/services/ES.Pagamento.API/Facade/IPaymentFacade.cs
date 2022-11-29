using NS.Pagamentos.API.Models;

namespace NS.Pagamentos.Facade
{
    public interface IPaymentFacade
    {
        Task<Transactions> AuthorizePayment(Payment pagamento);
        Task<Transactions> CatchPayment(Transactions transacao);
        Task<Transactions> CancelAuthorized(Transactions transacao);
    }
}