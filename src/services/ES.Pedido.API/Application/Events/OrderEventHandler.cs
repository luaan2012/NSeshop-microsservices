using MediatR;
using NS.Core.Messages.Integration;
using NS.MessageBus;

namespace NS.Pedidos.API.Application.Events
{
    public class OrderEventHandler : INotificationHandler<OrderRealizedEvent>
    {
        private readonly IMessageBus _bus;

        public OrderEventHandler(IMessageBus bus)
        {
            _bus = bus;
        }

        public async Task Handle(OrderRealizedEvent message, CancellationToken cancellationToken)
        {
            await _bus.PublishAsync(new OrderPlacedIntegrationEvent(message.ClientId));
        }
    }
}