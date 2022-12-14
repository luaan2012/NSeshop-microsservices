using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Pedidos.Infra.Migrations
{
    public partial class newCxt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TypeDiscount",
                table: "Vouchers",
                newName: "DiscountType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DiscountType",
                table: "Vouchers",
                newName: "TypeDiscount");
        }
    }
}
