using backend.ModelRequest;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class SavedOrderProductModelcs
    {
        public SavedOrderProductModelcs() { }
        public SavedOrderProductModelcs(long _Id, string _ImageName, OrderProductRequestModel _request)
        {
            Id = _Id;
            ProductId = _request.ProductId;
            UserId = _request.UserId;
            Text = _request.Text;
            ImageName = _ImageName;
        }
        public long Id { get; set; }

        public long ProductId { get; set; }
        public long UserId { get; set; }

        public string Text { get; set; }

        public string ImageName { get; set; }


        [NotMapped]
        public string ImageSrc { get; set; }
    }
}
