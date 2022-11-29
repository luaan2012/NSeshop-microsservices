using NS.Catalog.API.Data;
using NS.Catalogo.API.Data.Interface;
using NS.Catalogo.API.Data.Repository;

namespace NS.Catalog.API.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static void AddDependecyConfig(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<CatalogContext>();
        }
    } 
}