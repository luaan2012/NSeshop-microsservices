using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Carrinho.API.Migrations
{
    public partial class intialctx : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VoucherCodigo",
                table: "ClientCarts",
                newName: "VoucherCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VoucherCode",
                table: "ClientCarts",
                newName: "VoucherCodigo");
        }
    }
}
