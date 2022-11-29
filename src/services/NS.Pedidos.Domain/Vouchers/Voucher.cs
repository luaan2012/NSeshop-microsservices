using NS.Core.DomainObjects;
using NS.Pedidos.Domain.Specs;

namespace NS.Pedidos.Domain
{
    public class Voucher : Entity, IAggregateRoot
    {
        public string Code { get; private set; }
        public decimal? Percentage { get; private set; }
        public decimal? ValueDiscount { get; private set; }
        public int Quantity { get; private set; }
        public TypeDiscountVoucher TypeDiscount { get; private set; }
        public DateTime DataCreation { get; private set; }
        public DateTime? DataUse { get; private set; }
        public DateTime DataValidad { get; private set; }
        public bool Active { get; private set; }
        public bool Used { get; private set; }

        public bool IsValidForUse()
        {
            return new VoucherActiveSpecification()
                .And(new VoucherDataSpecification())
                .And(new VoucherQuantitySpecification())
                .IsSatisfiedBy(this);
        }

        public void MarkAsUsed()
        {
            Active = false;
            Used = true;
            Quantity = 0;
            DataUse = DateTime.Now;
        }

        public void DebitAmount()
        {
            Quantity -= 1;
            if (Quantity >= 1) return;

            MarkAsUsed();
        }
    }
}