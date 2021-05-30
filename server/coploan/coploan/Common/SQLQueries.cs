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

        public string ExecuteReader(string storeProcedureName)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(storeProcedureName, connection);
                    command.CommandType = CommandType.StoredProcedure;

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        results.Load(reader);
                    }
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            return JsonConvert.SerializeObject(results);
        }
        public string ExecuteReader(string storeProcedureName, List<SqlParameter> sqlParam)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(storeProcedureName, connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParam.ToArray());

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        results.Load(reader);
                    }
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            return JsonConvert.SerializeObject(results);
        }

        public bool ExecuteNonQuery(string storeProcedureName, List<SqlParameter> sqlParam)
        {
            bool isSuccess = false;
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(storeProcedureName, connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParam.ToArray());
                    int test = command.ExecuteNonQuery();
                    isSuccess = test > 0 ? true : false;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            return isSuccess;
        }

        public int ExecuteNonQueryInsert(string storeProcedureName, List<SqlParameter> sqlParam, string keyName)
        {
            int id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("DBMain")))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(storeProcedureName, connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(sqlParam.ToArray());
                    command.ExecuteNonQuery();
                    id = Convert.ToInt32(command.Parameters["@" + keyName].Value);
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
