using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Catalogo.API.Migrations
{
    public partial class attCatalogaaa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HighLighteds");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HighLighteds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Highlighted = table.Column<bool>(type: "bit", nullable: false),
                    Image = table.Column<string>(type: "varchar(100)", nullable: true),
                    Name = table.Column<string>(type: "varchar(100)", nullable: true),
                    ProductType = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HighLighteds", x => x.Id);
                });
        }
    }
}
