using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NS.Catalogo.API.Migrations
{
    public partial class banners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Banners",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<string>(type: "varchar(100)", nullable: true),
                    AltImage = table.Column<string>(type: "varchar(100)", nullable: true),
                    Title = table.Column<string>(type: "varchar(100)", nullable: true),
                    SubTitle = table.Column<string>(type: "varchar(100)", nullable: true),
                    Message = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banners", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Banners");
        }
    }
}
