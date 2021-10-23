using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;

namespace backend.Controllers
{

        [Route("api/[controller]")]
        [ApiController]
        public class ProductController : ControllerBase
        {
            private readonly IConfiguration _configuration;

            public ProductController(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            [HttpGet]
            public JsonResult Get()
            {
                string query = @"
                select ProductId as ""ProductId"",
                       ProductName as ""ProductName"",
                       ProductCategory as ""ProductCategory"",
                       ProductDescription as ""ProductDescription"",
                       ProductPrice as ""ProductPrice""
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
            public JsonResult Post(Product product)
            {
                string query = @"
                insert into products(ProductId,ProductName,ProductCategory,ProductDescription,ProductPrice)
                values (@ProductId,@ProductName,@ProductCategory,@ProductDescription,@ProductPrice)
            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("Database");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("@ProductName", product.ProductName);
                        myCommand.Parameters.AddWithValue("@ProductCategory", product.ProductCategory);
                        myCommand.Parameters.AddWithValue("@UserDescription", product.ProductDescription);
                        myCommand.Parameters.AddWithValue("@UserPrice", product.ProductPrice);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Added succesfully");
            }
        }
    }
