using backend.ModelRequest;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FaqsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FaqsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FaqModel>>> Get()
        {
            return await _context.Faqs.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<FaqModel>> PostTodoItem(FaqRequestModel requestFaq)
        {
            long Id = _context.Faqs.Count() + 1;
            FaqModel faq = new FaqModel(Id, requestFaq);
            _context.Faqs.Add(faq);
            await _context.SaveChangesAsync();

            return faq;
        }
    }
}
