using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        { }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<FaqModel> Faqs { get; set; }
        public DbSet<ProductModel> Products { get; set; }
    }
}
