using NS.Core.DomainObjects;
using NS.Core.Messages.Integration;
using NS.MessageBus;
using NS.Pedidos.Domain.Pedidos;

namespace NS.Pedidos.API.Services
{
    public class OrderIntegrationHandler : BackgroundService
    {
        private readonly IMessageBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public OrderIntegrationHandler(IServiceProvider serviceProvider, IMessageBus bus)
        {
            _serviceProvider = serviceProvider;
            _bus = bus;
        }
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            SetSubscribers();
            return Task.CompletedTask;
        }

        private void SetSubscribers()
        {
            _bus.SubscribeAsync<CanceledOrderIntegrationEvent>("PedidoCancelado",
                async request => await CancelPedido(request));

            _bus.SubscribeAsync<PaidOrderIntegrationEvent>("PedidoPago",
               async request => await FinashOrder(request));

            _bus.SubscribeAsync<RecuseOrderIntegrationEvent>("PedidoRecusado",
               async request => await RecuseOrder(request));

            _bus.SubscribeAsync<DeliveredOrderIntegrationEvent>("PedidoEntregue",
               async request => await DeliveredOrder(request));
        }

        private async Task CancelPedido(CanceledOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var orderRepository = scope.ServiceProvider.GetRequiredService<IOrderRepository>();

                var order = await orderRepository.GetById(message.OrderId);
                
                order.CancelOrder();

                orderRepository.Update(order);

                if (!await orderRepository.UnitOfWork.Commit())
                {
                    throw new DomainException($"Problemas ao cancelar o pedido {message.OrderId}");
                }
            }
        }

        private async Task FinashOrder(PaidOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var orderRepository = scope.ServiceProvider.GetRequiredService<IOrderRepository>();

                var order = await orderRepository.GetById(message.OrderId);
                order.FinalizeOrder();

                orderRepository.Update(order);

                if (!await orderRepository.UnitOfWork.Commit())
                {
                    throw new DomainException($"Problemas ao finalizar o pedido {message.OrderId}");
                }
            }
        }

        private async Task RecuseOrder(RecuseOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var orderRepository = scope.ServiceProvider.GetRequiredService<IOrderRepository>();

                var order = await orderRepository.GetById(message.OrderId);
                order.RecuseOrder();

                orderRepository.Update(order);

                if (!await orderRepository.UnitOfWork.Commit())
                {
                    throw new DomainException($"Problemas ao finalizar o pedido {message.OrderId}");
                }
            }
        }

        private async Task DeliveredOrder(DeliveredOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var orderRepository = scope.ServiceProvider.GetRequiredService<IOrderRepository>();

                var order = await orderRepository.GetById(message.OrderId);
                order.DeliveredOrder();

                orderRepository.Update(order);

                if (!await orderRepository.UnitOfWork.Commit())
                {
                    throw new DomainException($"Problemas ao finalizar o pedido {message.OrderId}");
                }
            }
        }
    }
}