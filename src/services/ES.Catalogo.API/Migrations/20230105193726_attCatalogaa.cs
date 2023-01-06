using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Catalogo.API.Migrations
{
    public partial class attCatalogaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HighLighteds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", nullable: true),
                    Image = table.Column<string>(type: "varchar(100)", nullable: true),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Highlighted = table.Column<bool>(type: "bit", nullable: false),
                    ProductType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HighLighteds", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HighLighteds");
        }
    }
}
