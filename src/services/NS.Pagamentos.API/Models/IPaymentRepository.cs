using NS.Core.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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