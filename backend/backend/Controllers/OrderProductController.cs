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
    public class OrderProductController: ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;


        public OrderProductController(AppDbContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }
    

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderProductModel>>> Get()
        {
            return await _context.OrderProducts
                .Select(x => new OrderProductModel()
                {
                    Id = x.Id,
                    ProductId = x.ProductId,
                    UserId = x.UserId,
                    Text = x.Text,
                    ImageName = x.ImageName,
                    ImageSrc = (x.ImageName == null) ? null : String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                })
                .ToListAsync();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<OrderProductModel>>> GetOrderProductsByUserId(long userId)
        {
            
            return await _context.OrderProducts.Where(order => order.UserId==userId)
                            .Select(x => new OrderProductModel()
                            {
                                Id = x.Id,
                                ProductId = x.ProductId,
                                UserId=x.UserId,
                                Text = x.Text,
                                ImageName = x.ImageName,
                                ImageSrc = (x.ImageName == null) ? null : String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                            })
                            .ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<OrderProductModel>> Post([FromForm] OrderProductRequestModel requestOrder)
        {
            
            long Id = _context.OrderProducts.Count() + 1;

            var orderCheck = await _context.OrderProducts.FindAsync(Id);
            while (orderCheck != null)
            {
                Id = Id + 1;
                orderCheck = await _context.OrderProducts.FindAsync(Id);
            }
            
            OrderProductModel order = new OrderProductModel(Id, requestOrder);
            if (order.ImageFile != null)
            {
                order.ImageName = await SaveImage(order.ImageFile);
            }

            _context.OrderProducts.Add(order);
            await _context.SaveChangesAsync();

            return order;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderProductModel>> Delete(long id)
        {
            var order = await _context.OrderProducts.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            _context.OrderProducts.Remove(order);
            await _context.SaveChangesAsync();

            return order;
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

    }
}
