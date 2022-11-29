using FluentValidation.Results;
using MediatR;
using NS.APICore.User;
using NS.Core.Mediator;
using NS.Pedidos.API.Application.Commands;
using NS.Pedidos.API.Application.Events;
using NS.Pedidos.API.Application.Queries;
using NS.Pedidos.Domain;
using NS.Pedidos.Domain.Pedidos;
using NS.Pedidos.Infra.Data;
using NS.Pedidos.Infra.Data.Repository;

namespace NS.Pedidos.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void RegisterServices(this IServiceCollection services)
        {
            // API
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAspNetUser, AspNetUser>();

            // Commands
            services.AddScoped<IRequestHandler<AddOrderCommand, ValidationResult>, OrderCommandHandler>();

            // Events
            services.AddScoped<INotificationHandler<OrderRealizedEvent>, OrderEventHandler>();

            // Application
            services.AddScoped<IMediatorHandler, MediatorHandler>();
            services.AddScoped<IVoucherQueries, VoucherQueries>();
            services.AddScoped<IOrderQueries, OrderQueries>();

            // Data
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IVoucherRepository, VoucherRepository>();
            services.AddScoped<OrderContext>();
        }
    }
}