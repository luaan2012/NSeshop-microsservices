using NetDevPack.Specification;
using System.Linq.Expressions;

namespace NS.Pedidos.Domain.Specs
{
    public class VoucherDataSpecification : Specification<Voucher>
    {
        public override Expression<Func<Voucher, bool>> ToExpression()
        {
            return voucher => voucher.DataValidad >= DateTime.Now;
        }
    }

    public class VoucherQuantitySpecification : Specification<Voucher>
    {
        public override Expression<Func<Voucher, bool>> ToExpression()
        {
            return voucher => voucher.Quantity > 0;
        }
    }

    public class VoucherActiveSpecification : Specification<Voucher>
    {
        public override Expression<Func<Voucher, bool>> ToExpression()
        {
            return voucher => voucher.Active && !voucher.Used;
        }
    }
}