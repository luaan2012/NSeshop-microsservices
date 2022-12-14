﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NS.Carrinho.API.Data;

#nullable disable

namespace NS.Carrinho.API.Migrations
{
    [DbContext(typeof(CartContext))]
    [Migration("20221214180223_newupdss")]
    partial class newupdss
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("NS.Carrinho.API.Model.ClientCart", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ClientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("ValueTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<bool>("VoucherUsed")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .HasDatabaseName("IDX_Client");

                    b.ToTable("ClientCarts");
                });

            modelBuilder.Entity("NS.Carrinho.API.Model.ItemCart", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CarrinhoId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Image")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(100)");

                    b.Property<Guid>("ProductId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("CarrinhoId");

                    b.ToTable("ItemCarts");
                });

            modelBuilder.Entity("NS.Carrinho.API.Model.ClientCart", b =>
                {
                    b.OwnsOne("NS.Carrinho.API.Model.Voucher", "Voucher", b1 =>
                        {
                            b1.Property<Guid>("ClientCartId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<string>("Code")
                                .HasColumnType("varchar(50)")
                                .HasColumnName("VoucherCode");

                            b1.Property<int>("DiscountType")
                                .HasColumnType("int")
                                .HasColumnName("DiscountType");

                            b1.Property<decimal?>("Percentage")
                                .HasColumnType("decimal(18,2)")
                                .HasColumnName("Percentage");

                            b1.Property<decimal?>("ValueDiscount")
                                .HasColumnType("decimal(18,2)")
                                .HasColumnName("DiscountValue");

                            b1.HasKey("ClientCartId");

                            b1.ToTable("ClientCarts");

                            b1.WithOwner()
                                .HasForeignKey("ClientCartId");
                        });

                    b.Navigation("Voucher");
                });

            modelBuilder.Entity("NS.Carrinho.API.Model.ItemCart", b =>
                {
                    b.HasOne("NS.Carrinho.API.Model.ClientCart", "ClientCart")
                        .WithMany("Items")
                        .HasForeignKey("CarrinhoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ClientCart");
                });

            modelBuilder.Entity("NS.Carrinho.API.Model.ClientCart", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
