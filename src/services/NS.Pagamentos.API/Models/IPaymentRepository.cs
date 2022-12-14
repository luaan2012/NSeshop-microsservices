using NS.Core.Data;

namespace NS.Pagamentos.API.Models
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        void AddPayment(Payment payment);
        void AddTransaction(Transactions transaction);
        Task<Payment> GetPaymentByOrderId(Guid orderId);
        Task<IEnumerable<Transactions>> GetTransactionByOrderId(Guid orderId);
    }
}