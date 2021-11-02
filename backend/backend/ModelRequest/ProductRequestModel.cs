using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.ModelRequest
{
    public class ProductRequestModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }
}
