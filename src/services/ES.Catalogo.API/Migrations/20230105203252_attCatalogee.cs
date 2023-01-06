using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Catalogo.API.Migrations
{
    public partial class attCatalogee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductCategory",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductCategory",
                table: "Products");
        }
    }
}
