using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using NS.Carrinho.API.Model;

namespace NS.Carrinho.API.Data
{
    public class CartContext : DbContext
    {
        public CartContext(DbContextOptions<CartContext> options) : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
            ChangeTracker.AutoDetectChangesEnabled = false;
        }

        public DbSet<ItemCart> ItemCarts { get; set; }
        public DbSet<ClientCart> ClientCarts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes().SelectMany(
                e => e.GetProperties().Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(100)");

            modelBuilder.Ignore<ValidationResult>();

            modelBuilder.Entity<ClientCart>()
                .HasIndex(c => c.ClientId)
                .HasDatabaseName("IDX_Client");

            modelBuilder.Entity<ClientCart>()
                .Ignore(c => c.Voucher)
                .OwnsOne(c => c.Voucher, v =>
                {
                    v.Property(vc => vc.Code)
                        .HasColumnName("VoucherCodigo")
                        .HasColumnType("varchar(50)");

                    v.Property(vc => vc.TypeDiscount)
                        .HasColumnName("DiscountType");

                    v.Property(vc => vc.Percentage)
                        .HasColumnName("Percentage");

                    v.Property(vc => vc.ValueDiscount)
                        .HasColumnName("DiscountValue");
                });

            modelBuilder.Entity<ClientCart>()
                .HasMany(c => c.Items)
                .WithOne(i => i.ClientCart)
                .HasForeignKey(c => c.CarrinhoId);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.Cascade;
        }
    }
}
