using backend.ModelRequest;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ProductModel
    {
        public ProductModel() { }
        public ProductModel(long _Id, ProductRequestModel _request)
        {
            Id = _Id;
            Name = _request.Name;
            Category = _request.Category;
            Description = _request.Description;
            Price = _request.Price;
            ImageFile = _request.ImageFile;
            UpdateImage =_request.UpdateImage;
        }
        public long Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public long Price { get; set; }

        public string ImageName { get; set; }

        public bool UpdateImage { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }

}
