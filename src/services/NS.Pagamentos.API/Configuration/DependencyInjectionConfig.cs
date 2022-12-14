using NS.APICore.User;
using NS.Pagamentos.API.Data;
using NS.Pagamentos.API.Data.Repository;
using NS.Pagamentos.API.Models;
using NS.Pagamentos.API.Services;
using NS.Pagamentos.CardAntiCorruption;
using NS.Pagamentos.Facade;

namespace NS.Pagamentos.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAspNetUser, AspNetUser>();

            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IPaymentFacade, CreditCartPaymentFacade>();

            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<PaymentContext>();
        }
    }
}