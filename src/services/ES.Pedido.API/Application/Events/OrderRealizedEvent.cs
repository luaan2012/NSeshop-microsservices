using NS.Core.Messages;

namespace NS.Pedidos.API.Application.Events
{
    public class OrderRealizedEvent : Event
    {
        public Guid OrderId { get; private set; }
        public Guid ClientId { get; private set; }

        public OrderRealizedEvent(Guid orderId, Guid clientId)
        {
            OrderId = orderId;
            ClientId = clientId;
        }
    }
}