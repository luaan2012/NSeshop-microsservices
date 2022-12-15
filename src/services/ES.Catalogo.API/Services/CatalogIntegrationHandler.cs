using NS.Catalog.API.Models;
using NS.Catalogo.API.Data.Interface;
using NS.Core.DomainObjects;
using NS.Core.Messages.Integration;
using NS.MessageBus;

namespace NS.Catalogo.API.Services
{
    public class CatalogIntegrationHandler : BackgroundService
    {
        private readonly IMessageBus _bus;
        private readonly IServiceProvider _serviceProvider;

        public CatalogIntegrationHandler(IServiceProvider serviceProvider, IMessageBus bus)
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
            _bus.SubscribeAsync<AuthorizedOrderIntegrationEvent>("PedidoAutorizado", async request =>
                await DownloadStock(request));
        }

        private async Task DownloadStock(AuthorizedOrderIntegrationEvent message)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var productsWithStock = new List<Product>();
                var productRepository = scope.ServiceProvider.GetRequiredService<IProductRepository>();

                var idsProducts = string.Join(",", message.Items.Select(c => c.Key));
                var products = await productRepository.GetProductsById(idsProducts);

                if (products.Count != message.Items.Count)
                {
                    CancelOrderWithoutStock(message);
                    return;
                }

                foreach (var product in products)
                {
                    var quantidadeProduto = message.Items.FirstOrDefault(p => p.Key == product.Id).Value;
                    
                    if (product.IsAvailable(quantidadeProduto))
                    {
                        product.WithDrawStock(quantidadeProduto);
                        productsWithStock.Add(product);
                    }
                }

                if (productsWithStock.Count != message.Items.Count)
                {
                    CancelOrderWithoutStock(message);
                    return;
                }

                foreach (var produto in productsWithStock)
                {
                    productRepository.Update(produto);
                }

                if (!await productRepository.UnitOfWork.Commit())
                {
                    throw new DomainException($"Problemas ao atualizar estoque do pedido {message.OrderId}");
                }

                var orderDown = new OrderDownloadedStockIntegrationEvent(message.ClientId, message.OrderId);
                await _bus.PublishAsync(orderDown);
            }
        }

        public async void CancelOrderWithoutStock(AuthorizedOrderIntegrationEvent message)
        {
            var pedidoCancelado = new CanceledOrderIntegrationEvent(message.ClientId, message.OrderId);
            await _bus.PublishAsync(pedidoCancelado);
        }
    }
}