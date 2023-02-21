using Microsoft.EntityFrameworkCore;
using NS.APICore.Extensions;
using NS.Carrinho.API.Data;
using NS.APICore.Identity;
using NS.Carrinho.API.Services.gRPC;

namespace NS.Carrinho.API.Configuration
{
    public static class ApiConfig
    {
        public static void AddApiConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CartContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection").Replace("{AppDir}", AppDomain.CurrentDomain.BaseDirectory)));

            services.AddDbContext<WishListContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection").Replace("{AppDir}", AppDomain.CurrentDomain.BaseDirectory)));

            services.AddControllers();

            services.AddGrpc();

            services.AddCorsGeral();
        }

        public static void UseApiConfiguration(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("Total");

            app.UseAuthConfiguration();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGrpcService<CartGrpcService>().RequireCors("Total");
            });
        }
    }
}