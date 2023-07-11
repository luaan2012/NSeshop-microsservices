using NS.Pedidos.API.Application.Queries;
using NS.Pedidos.Infra.Data;

namespace NS.Pedidos.API.Configuration
{
    public static class ExistingDb
    {
        public static void DbIsExisting(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<OrderContext>();
                context.Database.EnsureCreated();
			}
        }
    }
}
