using backend.ModelRequest;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class UserModel
    {
        public UserModel() { }
        public UserModel(long _Id, UserRequestModel _request)
        {
            Id = _Id;
            Name = _request.Name;
            Email = _request.Email;
            Password = _request.Password;
            Role = _request.Role;
            WantsAdmin = _request.WantsAdmin;
            ImageName = null;
            ImageFile = null;
         
        }
        public long Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }

        public bool WantsAdmin { get; set; }

        public string ImageName { get; set; }


        [NotMapped]
        public string ImageSrc { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; } 
    }
}
