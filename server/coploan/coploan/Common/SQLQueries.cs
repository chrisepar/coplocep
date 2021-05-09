using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace coploan.Common
{
    public class SQLQueries
    {
        private readonly IConfiguration _configuration;
        private DataTable results;

        public SQLQueries(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SQLQueries(IConfiguration configuration, Type myType)
        {
            _configuration = configuration;
            results = CreateEmptyDataTable(myType);
        }

        private static DataTable CreateEmptyDataTable(Type myType)
        {
            DataTable dt = new DataTable();

            foreach (PropertyInfo info in myType.GetProperties())
            {
                dt.Columns.Add(new DataColumn(info.Name, info.PropertyType));
            }

            return dt;
        }

        public string ExecuteReader(SqlCommand command)
        {
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
        public int ExecuteQueryInteger(SqlCommand command)
        {
            int value = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();

                    command.Connection = connection;
                    var sqlCol = command.ExecuteScalar();
                    if (sqlCol != null)
                    {
                        Int32.TryParse(sqlCol.ToString(), out value);
                    }
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            return value;
        }

        public bool ExecuteNonQuery(SqlCommand command)
        {
            bool isSuccess = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();

                    command.Connection = connection;
                    isSuccess = command.ExecuteNonQuery() > 0 ? true : false;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            return isSuccess;
        }

        public int ExecuteNonQueryInsert(SqlCommand command)
        {
            int id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();

                    command.Connection = connection;
                    var sqlCol = command.ExecuteScalar();
                    if (sqlCol != null)
                    {
                        Int32.TryParse(sqlCol.ToString(), out id);
                    }
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            return id;
        }
    }
}
