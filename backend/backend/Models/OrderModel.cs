using backend.ModelRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class OrderModel
    {
        public OrderModel() { }

        public OrderModel(long Id, OrderRequestModel requestModel)
        {
            this.Id = Id;
            this.ProductId = requestModel.ProductId;
            this.Address = requestModel.Address;
            this.price = requestModel.price;
        }
        public long Id { get; set; }
        public List<long> ProductId { get; set; }
        public string Address { get; set; }
        public int price { get; set; }
    }
}
