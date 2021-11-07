using backend.ModelRequest;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SavedProductModel
    {
        public SavedProductModel() { }
        public SavedProductModel(long _Id, string _ImageName, ProductRequestModel _request)
        {
            Id = _Id;
            Name = _request.Name;
            Category = _request.Category;
            Description = _request.Description;
            Price = _request.Price;
            ImageName = _ImageName;
        }
        public long Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public long Price { get; set; }

        public string ImageName { get; set; }


        [NotMapped]
        public string ImageSrc { get; set; }
    }
}
