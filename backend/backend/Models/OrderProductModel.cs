using backend.ModelRequest;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
   
    public class OrderProductModel
    {
        public OrderProductModel() { }
        public OrderProductModel(long _Id, OrderProductRequestModel _request)
        {
            Id = _Id;
            ProductId = _request.ProductId;
            UserId = _request.UserId;
            Text = _request.Text;
            ImageFile = _request.ImageFile;
        }
        public long Id { get; set; }

        public long ProductId{ get; set; }
        public long UserId { get; set; }

        public string Text { get; set; }

        public string ImageName { get; set; }


        [NotMapped]
        public string ImageSrc { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }

}
