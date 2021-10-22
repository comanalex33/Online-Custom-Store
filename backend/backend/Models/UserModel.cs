using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class UserModel
    {
        [Key]
        public int UserId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UserName { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UserEmail { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UserPassword { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string UserRole { get; set; }

        [Column(TypeName = "bool")]
        public bool UserWantsAdmin { get; set; }
    }
}
