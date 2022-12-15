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
                await AuthorizePayment(request));
        }

        private void SetSubscribers()
        {
            _bus.SubscribeAsync<CanceledOrderIntegrationEvent>("PedidoCancelado", async request =>
            await CancelPagamento(request));

            _bus.SubscribeAsync<OrderDownloadedStockIntegrationEvent>("PedidoBaixadoEstoque", async request =>
            await CatchPayment(request));
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            SetResponder();
            SetSubscribers();
            return Task.CompletedTask;
        }

        private async Task<ResponseMessage> AuthorizePayment(StartedOrderIntegrationEvent message)
        {
            using var scope = _serviceProvider.CreateScope();
            var paymentService = scope.ServiceProvider.GetRequiredService<IPaymentService>();
            var payment = new Payment
            {
                OrderId = message.OrderId,
                PaymentType = (PaymentType)message.TypePayment,
                Value = message.Value,
                CreditCard = new CreditCard(
                    message.CartName, message.CartNumber, message.MounthOfYear, message.CVV)
            };

            var response = await paymentService.AuthorizePayment(payment);

            return response;
        }

        private async Task CancelPagamento(CanceledOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var paymentService = scope.ServiceProvider.GetRequiredService<IPaymentService>();

                var response = await paymentService.CancelPayment(message.OrderId);

                if (!response.ValidationResult.IsValid)
                    throw new DomainException($"Falha ao cancelar pagamento do pedido {message.OrderId}");
            }
        }

        private async Task CatchPayment(OrderDownloadedStockIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var paymentService = scope.ServiceProvider.GetRequiredService<IPaymentService>();

                var response = await paymentService.CatchPayment(message.OrderId);

                if (!response.ValidationResult.IsValid)
                    throw new DomainException($"Falha ao capturar pagamento do pedido {message.OrderId}");

                var sorted = new Random().Next(2, 5);

                switch (sorted)
                {
                    case 1:
                        await SortedClass(new PaidOrderIntegrationEvent(message.ClientId, message.OrderId));
                        break;
                    case 2:
                        await SortedClass(new CanceledOrderIntegrationEvent(message.ClientId, message.OrderId));
                        break;
                    case 3:
                        await SortedClass(new RecuseOrderIntegrationEvent(message.ClientId, message.OrderId));
                        break;
                    case 4:
                        await SortedClass(new DeliveredOrderIntegrationEvent(message.ClientId, message.OrderId));
                        break;
                };
            }
        }

        private async Task SortedClass<T>(T obj) where T : IntegrationEvent
        {
            await _bus.PublishAsync(obj);
        }
    }
}