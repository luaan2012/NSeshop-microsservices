
using NS.Carrinho.API.Data;

namespace NS.Carrinho.API.Configuration
{
    public static class ExistingDb
    {
        public static void DbIsExisting(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context1 = serviceScope.ServiceProvider.GetRequiredService<CartContext>();
                context1.Database.EnsureCreated();
                
                var context2 = serviceScope.ServiceProvider.GetRequiredService<WishListContext>();
                context2.Database.EnsureCreated();
            }
        }
    }
}
