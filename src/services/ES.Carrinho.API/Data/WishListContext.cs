using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using NS.Carrinho.API.Model;

namespace NS.Carrinho.API.Data
{
    public class WishListContext : DbContext
    {
        public WishListContext(DbContextOptions<WishListContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<ItemWishList> ItemWishLists { get; set; }
        public DbSet<ClientWishList> ClientWishLists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(
                e => e.GetProperties().Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)");

            modelBuilder.Ignore<ValidationResult>();

            modelBuilder.Entity<ClientWishList>()
                .HasIndex(c => c.ClientWishListId)
                .HasDatabaseName("IDX_ClientWishList");
          
            modelBuilder.Entity<ClientWishList>()
                .HasMany(c => c.Items)
                .WithOne(i => i.ClientWishList)
                .HasForeignKey(c => c.WishListId);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.Cascade;
        }
    }
}
