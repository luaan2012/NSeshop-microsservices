using NS.Core.DomainObjects;

namespace NS.Pagamentos.API.Models
{
    public class Payment : Entity, IAggregateRoot
    {
        public Payment()
        {
            Transactions = new List<Transactions>();
        }

        public Guid OrderId { get; set; }
        public TypePayment TypePayment { get; set; }
        public decimal Value { get; set; }

        public CreditCard CreditCard { get; set; }

        // EF Relation
        public ICollection<Transactions> Transactions { get; set; }

        public void AddTransaction(Transactions transacao)
        {
            Transactions.Add(transacao);
        }
    }
}