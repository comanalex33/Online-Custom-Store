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
        public DbSet<FavouriteModel> Favourites { get; set; }
        public DbSet<OrderProductModel> OrderProducts { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<SavedProductModel> SavedProducts { get; set; }
        public DbSet<SavedOrderProductModelcs> SavedOrderProducts { get; set; }
    }
}
