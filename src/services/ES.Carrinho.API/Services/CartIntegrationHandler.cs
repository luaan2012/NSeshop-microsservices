using Microsoft.EntityFrameworkCore;
using NS.Carrinho.API.Data;
using NS.Core.Messages.Integration;
using NS.MessageBus;

namespace NS.Carrinho.API.Services
{
    public class CartIntegrationHandler : BackgroundService
    {
        private readonly IMessageBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public CartIntegrationHandler(IServiceProvider serviceProvider, IMessageBus bus)
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
            _bus.SubscribeAsync<OrderPlacedIntegrationEvent>("OrderPlaced", async request =>
                await ClearCart(request));
        }

        private async Task ClearCart(OrderPlacedIntegrationEvent message)
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<CartContext>();

            var carrinho = await context.ClientCarts
                .FirstOrDefaultAsync(c => c.ClientId == message.ClientId);

            if (carrinho != null)
            {
                context.ClientCarts.Remove(carrinho);
                await context.SaveChangesAsync();
            }
        }
    }
}
