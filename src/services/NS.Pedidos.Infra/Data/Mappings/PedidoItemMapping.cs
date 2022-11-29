﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NS.Pedidos.Domain.Pedidos;

namespace NS.Pedidos.Infra.Data.Mappings
{
    public class PedidoItemMapping : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.ProductName)
                .IsRequired()
                .HasColumnType("varchar(250)");

            // 1 : N => Pedido : Pagamento
            builder.HasOne(c => c.Order)
                .WithMany(c => c.OrderItems);

            builder.ToTable("PedidoItems");
        }
    }
}