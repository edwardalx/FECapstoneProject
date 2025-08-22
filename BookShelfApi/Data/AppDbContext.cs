using Microsoft.EntityFrameworkCore;
using BookShelfApi.Models;

namespace BookShelfApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Book> Books { get; set; }
    }
}
