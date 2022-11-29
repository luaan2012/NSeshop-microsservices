using NS.Core.DomainObjects;
using NS.Core.Messages.Integration;
using NS.MessageBus;
using NS.Pagamentos.API.Models;

namespace NS.Pagamentos.API.Services
{
    public class PaymentIntegrationHandler : BackgroundService
    {
        private readonly IMessageBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public PaymentIntegrationHandler(
                            IServiceProvider serviceProvider,
                            IMessageBus bus)
        {
            _serviceProvider = serviceProvider;
            _bus = bus;
        }

        private void SetResponder()
        {
            _bus.RespondAsync<StartedOrderIntegrationEvent, ResponseMessage>(async request =>
                await AutorizarPagamento(request));
        }

        private void SetSubscribers()
        {
            _bus.SubscribeAsync<CanceledOrderIntegrationEvent>("PedidoCancelado", async request =>
            await CancelarPagamento(request));

            _bus.SubscribeAsync<OrderDownloadedStockIntegrationEvent>("PedidoBaixadoEstoque", async request =>
            await CapturarPagamento(request));
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            SetResponder();
            SetSubscribers();
            return Task.CompletedTask;
        }

        private async Task<ResponseMessage> AutorizarPagamento(StartedOrderIntegrationEvent message)
        {
            using var scope = _serviceProvider.CreateScope();
            var pagamentoService = scope.ServiceProvider.GetRequiredService<IPaymentService>();
            var pagamento = new Payment
            {
                OrderId = message.OrderId,
                TypePayment = (TypePayment)message.TypePayment,
                Value = message.Value,
                CreditCard = new CreditCard(
                    message.CartName, message.CartNumber, message.MounthOfYear, message.CVV)
            };

            var response = await pagamentoService.AuthorizePayment(pagamento);

            return response;
        }

        private async Task CancelarPagamento(CanceledOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var pagamentoService = scope.ServiceProvider.GetRequiredService<IPaymentService>();

                var response = await pagamentoService.CancelPayment(message.OrderId);

                if (!response.ValidationResult.IsValid)
                    throw new DomainException($"Falha ao cancelar pagamento do pedido {message.OrderId}");
            }
        }

        private async Task CapturarPagamento(OrderDownloadedStockIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var pagamentoService = scope.ServiceProvider.GetRequiredService<IPaymentService>();

                var response = await pagamentoService.CatchPayment(message.OrderId);

                if (!response.ValidationResult.IsValid)
                    throw new DomainException($"Falha ao capturar pagamento do pedido {message.OrderId}");

                await _bus.PublishAsync(new PaidOrderIntegrationEvent(message.ClientId, message.OrderId));
            }
        }
    }
}