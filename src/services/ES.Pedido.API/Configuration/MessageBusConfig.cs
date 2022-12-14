using NS.Core.Utils;
using NS.MessageBus;
using NS.Pedidos.API.Services;

namespace NS.Pedidos.API.Configuration
{
    public static class MessageBusConfig
    {
        public static void AddMessageBusConfiguration(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddMessageBus(configuration.GetMessageQueueConnection("MessageBus"))
                .AddHostedService<OrchestratorRequestIntegrationHandler>()
                .AddHostedService<OrderIntegrationHandler>();
        }
    }
}