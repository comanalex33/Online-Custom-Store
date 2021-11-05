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
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderModel>>> Get()
        {
            return await _context.Orders.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<OrderModel>> PostTodoItem(OrderRequestModel requestModel)
        {
            long Id = _context.Orders.Count() + 1;

            var orderCheck = await _context.Orders.FindAsync(Id);
            while (orderCheck != null)
            {
                Id = Id + 1;
                orderCheck = await _context.Orders.FindAsync(Id);
            }

            OrderModel order = new OrderModel(Id, requestModel);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return order;
        }

        [HttpGet("{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderProductModel>>> GetProductsByOrderId(long orderId)
        {
            var list = _context.Orders.Where(order => order.Id == orderId).Select(order => order.ProductId).First();
            return await _context.OrderProducts.Where(prod => list.Contains(prod.Id))
                            .Select(x => new OrderProductModel()
                            {
                                Id = x.Id,
                                ProductId = x.ProductId,
                                Text = x.Text,
                                ImageName = x.ImageName,
                                ImageSrc = (x.ImageName == null) ? null : String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName),
                            })
                            .ToListAsync();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderModel>> Delete(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }
    }
}
