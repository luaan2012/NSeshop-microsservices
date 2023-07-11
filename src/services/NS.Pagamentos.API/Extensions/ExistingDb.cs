using NS.Pagamentos.API.Data;

namespace NS.Pagamentos.API.Configuration
{
    public static class ExistingDb
    {
        public static void DbIsExisting(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<PaymentContext>();
                context.Database.EnsureCreated();
            }
        }
    }
}
