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
                })
                .ToListAsync();
        }

        

        [HttpPost]
        public async Task<ActionResult<ProductModel>> PostTodoItem([FromForm] ProductRequestModel productRequest)
        {
            long Id = _context.Faqs.Count() + 1;

            var faqCheck = await _context.Products.FindAsync(Id);
            while (faqCheck != null)
            {
                Id = Id + 1;
                faqCheck = await _context.Products.FindAsync(Id);
            }
            ProductModel product = new ProductModel(Id, productRequest);
            if (product.ImageFile != null)
            {
                product.ImageName = await SaveImage(product.ImageFile);
            }
            
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return product;
        }

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

        [HttpDelete]
        public async Task<ActionResult<ProductModel>> Delete(long id)
        {
            try
            {
                var productToDelete = await _context.Products
            .FirstOrDefaultAsync(e => e.Id == id);

                if (productToDelete == null)
                {
                    return NotFound($"Employee with Id = {id} not found");
                }

                return await DeleteItem(id);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }

        [NonAction]
        public async Task<ActionResult<ProductModel>> DeleteItem(long id)
        {
            var result = await _context.Products
                .FirstOrDefaultAsync(e => e.Id == id);
            if (result != null)
            {
                _context.Products.Remove(result);
                await _context.SaveChangesAsync();
                return result;
            }
            return null;
        }

}
}