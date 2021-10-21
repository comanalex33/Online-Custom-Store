using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FaqsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FaqsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select FaqId as ""FaqId"",
                       FaqQuestion as ""FaqQuestion"",
                       FaqAnswer as ""FaqAnswer""
                from faqs
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
        public JsonResult Post(Faq faq)
        {
            string query = @"
                insert into faqs(FaqQuestion,FaqAnswer)
                values (@FaqQuestion,@FaqAnswer)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FaqQuestion", faq.FaqQuestion);
                    myCommand.Parameters.AddWithValue("@FaqAnswer", faq.FaqAnswer);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added succesfully");
        }

        [HttpPut]
        public JsonResult Put(Faq faq)
        {
            string query = @"
                update faqs
                set FaqQuestion = @FaqQuestion,
                    FaqAnswer = @FaqAnswer
                where FaqId = @FaqId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FaqId", faq.FaqId);
                    myCommand.Parameters.AddWithValue("@FaqQuestion", faq.FaqQuestion);
                    myCommand.Parameters.AddWithValue("@FaqAnswer", faq.FaqAnswer);
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
                delete from faqs
                where FaqId=@FaqId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FaqId", id);
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
