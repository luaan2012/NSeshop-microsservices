using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Carrinho.API.Migrations
{
    public partial class newupdss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UsedVoucher",
                table: "ClientCarts",
                newName: "VoucherUsed");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VoucherUsed",
                table: "ClientCarts",
                newName: "UsedVoucher");
        }
    }
}
