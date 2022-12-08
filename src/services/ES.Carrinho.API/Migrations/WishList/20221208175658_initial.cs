using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Carrinho.API.Migrations.WishList
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClientWishLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClientWishListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientWishLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemWishLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", nullable: true),
                    Image = table.Column<string>(type: "varchar(100)", nullable: true),
                    WishListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemWishLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemWishLists_ClientWishLists_WishListId",
                        column: x => x.WishListId,
                        principalTable: "ClientWishLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IDX_ClientWishList",
                table: "ClientWishLists",
                column: "ClientWishListId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemWishLists_WishListId",
                table: "ItemWishLists",
                column: "WishListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemWishLists");

            migrationBuilder.DropTable(
                name: "ClientWishLists");
        }
    }
}
