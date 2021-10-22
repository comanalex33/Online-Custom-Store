using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select UserId as ""UserId"",
                       UserName as ""UserName"",
                       UserEmail as ""UserEmail"",
                       UserPassword as ""UserPassword"",
                       UserRole as ""UserRole"",
                       UserWantsAdmin as ""UserWantsAdmin""
                from Users
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(UserModel user)
        {
            string query = @"
                insert into Users(UserName,UserEmail,UserPassword,UserRole,UserWantsAdmin)
                values (@UserName,@UserEmail,@UserPassword,@UserRole,@UserWantsAdmin)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserName", user.UserName);
                    myCommand.Parameters.AddWithValue("@UserEmail", user.UserEmail);
                    myCommand.Parameters.AddWithValue("@UserPassword", user.UserPassword);
                    myCommand.Parameters.AddWithValue("@UserRole", user.UserRole);
                    myCommand.Parameters.AddWithValue("@UserWantsAdmin", user.UserWantsAdmin);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added succesfully");
        }

        [HttpPut]
        public JsonResult Put(UserModel user)
        {
            string query = @"
                update Users
                set UserName = @UserName,
                    UserEmail = @UserEmail,
                    UserPassword = @UserPassword,
                    UserRole = @UserRole,
                    UserWantsAdmin = @UserWantsAdmin
                where UserId = @UserId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", user.UserId);
                    myCommand.Parameters.AddWithValue("@UserName", user.UserName);
                    myCommand.Parameters.AddWithValue("@UserEmail", user.UserEmail);
                    myCommand.Parameters.AddWithValue("@UserPassword", user.UserPassword);
                    myCommand.Parameters.AddWithValue("@UserRole", user.UserRole);
                    myCommand.Parameters.AddWithValue("@UserWantsAdmin", user.UserWantsAdmin);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated succesfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from Users
                where UserId=@UserId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@UserId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted succesfully");
        }
    }
}
