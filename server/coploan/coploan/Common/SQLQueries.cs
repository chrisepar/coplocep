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
            results = new DataTable();
        }

        public SQLQueries(IConfiguration configuration, Type myType)
        {
            _configuration = configuration;
            results = CreateEmptyDataTable(myType);
        }

        public SQLQueries(IConfiguration configuration, Type[] myType)
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

        private static DataTable CreateEmptyDataTable(Type[] myType)
        {
            DataTable dt = new DataTable();
            foreach (Type type in myType)
            {
                foreach (PropertyInfo info in type.GetProperties())
                {
                    if (!dt.Columns.Contains(info.Name))
                    {
                        dt.Columns.Add(new DataColumn(info.Name, info.PropertyType));
                    }
                }
            }

            return dt;
        }

        public DataTable ExecuteReader(string storeProcedureName)
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
            return results;
        }
        public DataTable ExecuteReader(string storeProcedureName, List<SqlParameter> sqlParam)
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
            return results;
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

        private SqlParameter CreateSQLParam(object data, PropertyInfo item)
        {
            StringBuilder itemSB = new StringBuilder();
            itemSB.Append("@").Append(item.Name);
            return new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data));
        }

        private SqlParameter CreateSQLParam(object data, PropertyInfo item, string outParam)
        {
            StringBuilder itemSB = new StringBuilder();
            itemSB.Append("@").Append(item.Name);
            if (item.Name != outParam)
            {
                return new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data));
            }
            else
            {
                return new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)) { Direction = ParameterDirection.Output, DbType = DbType.Int32 };
            }
        }

        public List<SqlParameter> GenerateSQLParamFromInstance(Type property, object data)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            foreach (PropertyInfo item in property.GetProperties())
            {
                sqlParam.Add(CreateSQLParam(data, item));
            }
            return sqlParam;
        }
        public List<SqlParameter> GenerateSQLParamFromInstance(Type property, object data, List<string> included)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            foreach (PropertyInfo item in property.GetProperties())
            {
                if (included.Contains(item.Name))
                {
                    sqlParam.Add(CreateSQLParam(data, item));
                }
            }
            return sqlParam;
        }
        public List<SqlParameter> GenerateSQLParamFromInstance(Type property, object data, string outParam)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            foreach (PropertyInfo item in property.GetProperties())
            {
                sqlParam.Add(CreateSQLParam(data, item, outParam));
            }
            return sqlParam;
        }
    }
}
