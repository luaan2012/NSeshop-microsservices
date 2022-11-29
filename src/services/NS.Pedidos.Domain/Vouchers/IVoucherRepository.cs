using NS.Core.Data;

namespace NS.Pedidos.Domain
{
    public interface IVoucherRepository : IRepository<Voucher>
    {
        Task<Voucher> GetVoucherByCode(string code);
        void Update(Voucher voucher);
    }
}