using NS.Core.Messages.Integration;
using NS.MessageBus;
using NS.Pedidos.API.Application.Queries;


namespace NS.Pedidos.API.Services
{
    public class OrchestratorRequestIntegrationHandler : IHostedService, IDisposable
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<OrchestratorRequestIntegrationHandler> _logger;
        private Timer _timer;

        public OrchestratorRequestIntegrationHandler(ILogger<OrchestratorRequestIntegrationHandler> logger,
            IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Serviço de pedidos iniciado.");

            _timer = new Timer(ProcessOrder, null, TimeSpan.Zero,
                TimeSpan.FromSeconds(15));

            return Task.CompletedTask;
        }

        private async void ProcessOrder(object state)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var orderQueries = scope.ServiceProvider.GetRequiredService<IOrderQueries>();
                var order = await orderQueries.GetOrderAuthorize();

                if (order == null) return;

                var bus = scope.ServiceProvider.GetRequiredService<IMessageBus>();

                var orderAuthorized = new AuthorizedOrderIntegrationEvent(order.ClientId, order.Id,
                    order.OrderItems.ToDictionary(p => p.ProductId, p => p.Quantity));

                await bus.PublishAsync(orderAuthorized);

                _logger.LogInformation($"Pedido ID: {order.Id} foi encaminhado para baixa no estoque.");
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Serviço de pedidos finalizado.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}