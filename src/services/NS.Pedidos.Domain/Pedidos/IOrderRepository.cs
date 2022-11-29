using NS.Core.Data;
using System.Data.Common;

namespace NS.Pedidos.Domain.Pedidos
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order> GetById(Guid id);
        Task<IEnumerable<Order>> GetListByClientId(Guid clientId);
        void Add(Order order);
        void Update(Order order);

        DbConnection GetConnection();

        /* Pedido Item */
        Task<OrderItem> GetItemById(Guid id);
        Task<OrderItem> GetItemByOrder(Guid orderId, Guid productId);
    }
}