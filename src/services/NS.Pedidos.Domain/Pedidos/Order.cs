using NS.Core.DomainObjects;

namespace NS.Pedidos.Domain.Pedidos
{
    public class Order : Entity, IAggregateRoot
    {
        public Order(Guid clientId, decimal valueTotal, List<OrderItem> orderItems, 
            bool voucherUsed = false, decimal discount = 0, Guid? voucherId = null)
        {
            ClientId = clientId;
            ValueTotal = valueTotal;
            _orderItems = orderItems;

            Discount = discount;
            VoucherUsed = voucherUsed;
            VoucherId = voucherId;
        }

        // EF ctor
        protected Order() { }

        public int Code { get; private set; }
        public Guid ClientId { get; private set; }
        public Guid? VoucherId { get; private set; }
        public bool VoucherUsed { get; private set; }
        public decimal Discount { get; private set; }
        public decimal ValueTotal { get; private set; }
        public DateTime DataRegister { get; private set; }
        public OrderStatus OrderStatus { get; private set; }

        private readonly List<OrderItem> _orderItems;
        public IReadOnlyCollection<OrderItem> OrderItems => _orderItems;
        
        public Address Address { get; private set; }

        // EF Rel.
        public Voucher Voucher { get; private set; }

        public void AuthorizeOrder()
        {
            OrderStatus = OrderStatus.Authorized;
        }

        public void CancelOrder()
        {
            OrderStatus = OrderStatus.Cancel;
        }

        public void FinalizeOrder()
        {
            OrderStatus = OrderStatus.Paid;
        }

        public void RecuseOrder()
        {
            OrderStatus = OrderStatus.Recuse;
        }

        public void DeliveredOrder()
        {
            OrderStatus = OrderStatus.Delivered;
        }

        public void AssignVoucher(Voucher voucher)
        {
            VoucherUsed = true;
            VoucherId = voucher.Id;
            Voucher = voucher;
        }

        public void AssignAddress(Address address)
        {
            Address = address;
        }

        public void CalculateValueOrder()
        {
            ValueTotal = OrderItems.Sum(p => p.CalculateValue());
            CalculateValueTotalDiscount();
        }

        public void CalculateValueTotalDiscount()
        {
            if (!VoucherUsed) return;

            decimal discount = 0;
            var value = ValueTotal;

            if (Voucher.DiscountType == DiscountTypeVoucher.Percentage)
            {
                if (Voucher.Percentage.HasValue)
                {
                    discount = (value * Voucher.Percentage.Value) / 100;
                    value -= discount;
                }
            }
            else
            {
                if (Voucher.ValueDiscount.HasValue)
                {
                    discount = Voucher.ValueDiscount.Value;
                    value -= discount;
                }
            }

            ValueTotal = value < 0 ? 0 : value;
            Discount = discount;
        }
    }
}