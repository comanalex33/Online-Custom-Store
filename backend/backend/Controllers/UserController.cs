using backend.ModelRequest;
using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UserController(AppDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get()
        {
            return await _context.Users
                .Select(x => new UserModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Email = x.Email,
                    Password = x.Password,
                    Role = x.Role,
                    WantsAdmin = x.WantsAdmin,
                    ImageName = x.ImageName,
                    ImageSrc = (x.ImageName == null) ? String.Format("{0}://{1}{2}/DefaultImages/default_image.jpg", Request.Scheme, Request.Host, Request.PathBase) : String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                })
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetById(long id)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound();
            }

            user.ImageSrc = (user.ImageName == null) ? String.Format("{0}://{1}{2}/DefaultImages/default_image.jpg", Request.Scheme, Request.Host, Request.PathBase) : String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName);

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> Post(UserRequestModel requestUser)
        {
            var list = _context.Users.Where(user => user.Name == requestUser.Name).ToList();
            if (list.Count != 0)
            {
                return BadRequest();
            }

            long Id = _context.Users.Count() + 1;

            var userCheck = await _context.Users.FindAsync(Id);
            while(userCheck != null)
            {
                Id = Id + 1;
                userCheck = await _context.Users.FindAsync(Id);
            }

            UserModel user = new UserModel(Id, requestUser);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromForm] UserModel user)
        {
            if (user.ImageFile != null)
            {
                user.ImageName = await SaveImage(user.ImageFile);
            }
          
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UserModel>> Delete(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);

            var listFavourites = _context.Favourites.Where(fav => fav.UserId == id).ToList();
            for(int i = 0; i < listFavourites.Count; i++)
            {
                _context.Favourites.Remove(listFavourites[i]);
            }

            var listOrderProducts = _context.OrderProducts.Where(fav => fav.UserId == id).ToList();
            for (int i = 0; i < listOrderProducts.Count; i++)
            {
                _context.OrderProducts.Remove(listOrderProducts[i]);
            }

            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(long id) => _context.Users.Any(e => e.Id == id);

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
