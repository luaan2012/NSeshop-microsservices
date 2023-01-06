using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Catalogo.API.Migrations
{
    public partial class attCatalog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeSleep",
                table: "Banners",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeSleep",
                table: "Banners");
        }
    }
}
