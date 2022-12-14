using NS.Core.Utils;
using NS.MessageBus;
using NS.Pagamentos.API.Services;

namespace NS.Pagamentos.API.Configuration
{
    public static class MessageBusConfig
    {
        public static void AddMessageBusConfiguration(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddMessageBus(configuration.GetMessageQueueConnection("MessageBus"))
                .AddHostedService<PaymentIntegrationHandler>();
        }
    }
}