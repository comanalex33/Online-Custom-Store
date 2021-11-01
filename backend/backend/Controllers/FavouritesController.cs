using backend.ModelRequest;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavouritesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavouriteModel>>> Get()
        {
            return await _context.Favourites.ToListAsync();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<ProductModel>>> GetProductsByUserId(long userId)
        {
            var list = _context.Favourites.Where(fav => fav.UserId == userId).Select(fav => fav.ProductId).ToList();
            return await _context.Products.Where(prod => list.Contains(prod.Id)).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FavouriteModel>> Post(FavouriteRequestModel requestFavourite)
        {
            long Id = _context.Favourites.Count() + 1;

            var favouriteCheck = await _context.Favourites.FindAsync(Id);
            while (favouriteCheck != null)
            {
                Id = Id + 1;
                favouriteCheck = await _context.Favourites.FindAsync(Id);
            }

            FavouriteModel favourite = new FavouriteModel(Id, requestFavourite);
            _context.Favourites.Add(favourite);
            await _context.SaveChangesAsync();

            return favourite;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<FavouriteModel>> Delete(long id)
        {
            var favourite = await _context.Favourites.FindAsync(id);
            if (favourite == null)
            {
                return NotFound();
            }
            _context.Favourites.Remove(favourite);
            await _context.SaveChangesAsync();

            return favourite;
        }
    }
}
