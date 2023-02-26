using NS.Catalog.API.Data;

namespace NS.Catalogo.API.Configuration
{
    public static class ExistingDb
    {
        public static void DbIsExisting(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<CatalogContext>();
                context.Database.EnsureCreated();
            }
        }
    }
}
