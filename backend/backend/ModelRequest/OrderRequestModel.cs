using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.ModelRequest
{
    public class OrderRequestModel
    {
        public List<long> ProductId { get; set; }
        public string Address { get; set; }
        public int price { get; set; }
    }
}
