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
            return await _context.Products.Where(prod => list.Contains(prod.Id))
                            .Select(x => new ProductModel()
                            {
                                Id = x.Id,
                                Name = x.Name,
                                Category = x.Category,
                                Description = x.Description,
                                Price = x.Price,
                                ImageName = x.ImageName,
                                ImageSrc = (x.ImageName == null) ? null : String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                                UpdateImage = x.UpdateImage
                            })
                            .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FavouriteModel>> Post(FavouriteRequestModel requestFavourite)
        {
            var list = _context.Favourites.Where(fav => fav.ProductId == requestFavourite.ProductId && fav.UserId == requestFavourite.UserId).ToList();
            if (list.Count != 0)
            {
                return BadRequest();
            }
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
