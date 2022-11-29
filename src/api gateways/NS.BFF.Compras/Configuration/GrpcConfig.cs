using NS.BFF.Compras.Services.gRPC;
using NS.Carrinho.API.Services.gRPC;

namespace NS.BFF.Compras.Configuration
{
    public static class GrpcConfig
    {
        public static void ConfigureGrpcServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<GrpcServiceInterceptor>();

            services.AddScoped<ICartGrpcService, CartGrpcService>();

            services.AddGrpcClient<ShoppingCart.ShoppingCartClient>(options =>
            {
                options.Address = new Uri(configuration["CartUrl"]);
            }).AddInterceptor<GrpcServiceInterceptor>();
        }
    }
}