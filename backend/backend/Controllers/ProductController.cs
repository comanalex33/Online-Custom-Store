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
        public class ProductController : ControllerBase
        {
            private readonly AppDbContext _context;
            private readonly IWebHostEnvironment _hostEnvironment;

        public ProductController(AppDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductModel>>> Get()
        {
            return await _context.Products
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
        public async Task<ActionResult<UserModel>> PostTodoItem(UserRequestModel requestUser)
        {
            long Id = _context.Users.Count() + 1;
            UserModel user = new UserModel(Id, requestUser);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        [HttpPut]
        public async Task<IActionResult> PutTodoItem([FromForm] ProductModel user)
        {
            if (user.ImageFile != null)
            {
                user.ImageName = await SaveImage(user.ImageFile);
            }
            else if (user.UpdateImage == true)
            {
                user.ImageSrc = null;
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
