using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookShelfApi.Migrations
{
    /// <inheritdoc />
    public partial class updatedbooksmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image_url",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image_url",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Summary",
                table: "Books");
        }
    }
}
