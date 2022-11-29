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

                foreach (var produto in products)
                {
                    var quantidadeProduto = message.Items.FirstOrDefault(p => p.Key == produto.Id).Value;
                    
                    if (produto.IsAvailable(quantidadeProduto))
                    {
                        produto.WithDrawStock(quantidadeProduto);
                        productsWithStock.Add(produto);
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
                    throw new DomainException($"Problemas ao atualizar estoque do pedido {message.PedidoId}");
                }

                var pedidoBaixado = new OrderDownloadedStockIntegrationEvent(message.ClienteId, message.PedidoId);
                await _bus.PublishAsync(pedidoBaixado);
            }
        }

        public async void CancelOrderWithoutStock(AuthorizedOrderIntegrationEvent message)
        {
            var pedidoCancelado = new CanceledOrderIntegrationEvent(message.ClienteId, message.PedidoId);
            await _bus.PublishAsync(pedidoCancelado);
        }
    }
}