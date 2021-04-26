using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace coploan.Common
{
    public class SQLQueries
    {
        private readonly IConfiguration _configuration;

        public SQLQueries(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Query(SqlCommand command)
        {
            var results = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();

                    command.Connection = connection;
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        results.Load(reader);
                    }
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return e.ToString();
            }
            return JsonConvert.SerializeObject(results);
        }
    }
}
