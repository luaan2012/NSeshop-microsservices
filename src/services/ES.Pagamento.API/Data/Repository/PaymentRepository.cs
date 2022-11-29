using Microsoft.EntityFrameworkCore;
using NS.Core.Data;
using NS.Pagamentos.API.Models;


namespace NS.Pagamentos.API.Data.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly PaymentContext _context;

        public PaymentRepository(PaymentContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;

        public void AddPayment(Payment payment)
        {
            _context.Payments.Add(payment);
        }

        public void AddTransaction(Transactions transaction)
        {
            _context.Transactions.Add(transaction);
        }

        public async Task<Payment> GetPaymentByOrderId(Guid pedidoId)
        {
            return await _context.Payments.AsNoTracking()
                .FirstOrDefaultAsync(p => p.OrderId == pedidoId);
        }

        public async Task<IEnumerable<Transactions>> GetTransactionByOrderId(Guid orderId)
        {
            return await _context.Transactions.AsNoTracking()
                .Where(t => t.Payment.OrderId == orderId).ToListAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}