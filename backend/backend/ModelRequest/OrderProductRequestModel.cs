using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace backend.ModelRequest
{
    public class OrderProductRequestModel
    {
        public long ProductId { get; set; }
        public string Text { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
