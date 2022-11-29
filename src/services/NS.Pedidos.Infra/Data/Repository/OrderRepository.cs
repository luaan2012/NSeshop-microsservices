using Microsoft.EntityFrameworkCore;
using NS.Core.Data;
using NS.Pedidos.Domain.Pedidos;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace NS.Pedidos.Infra.Data.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrderContext _context;

        public OrderRepository(OrderContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;

        public DbConnection GetConnection() => _context.Database.GetDbConnection();

        public async Task<Order> GetById(Guid id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetListByClientId(Guid clientId)
        {
            return await _context.Orders
                .Include(p => p.OrderItems)
                .AsNoTracking()
                .Where(p => p.ClientId == clientId)
                .ToListAsync();
        }

        public void Add(Order order)
        {
            _context.Orders.Add(order);
        }

        public void Update(Order order)
        {
            _context.Orders.Update(order);
        }


        public async Task<OrderItem> GetItemById(Guid id)
        {
            return await _context.OrderItems.FindAsync(id);
        }

        public async Task<OrderItem> GetItemByOrder(Guid orderIdId, Guid productId)
        {
            return await _context.OrderItems
                .FirstOrDefaultAsync(p => p.ProductId == orderIdId && p.OrderId == productId);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}