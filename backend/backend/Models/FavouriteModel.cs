using backend.ModelRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class FavouriteModel
    {
        public FavouriteModel() { }
        public FavouriteModel(long _Id, FavouriteRequestModel _request)
        {
            Id = _Id;
            UserId = _request.UserId;
            ProductId = _request.ProductId;
        }
        public long Id { get; set; }
        public long UserId { get; set; }
        public long ProductId { get; set; }
    }
}
