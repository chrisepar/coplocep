using coploan.Common;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;

namespace coploan.Models
{
    public class UserRole
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
    public class Security
    {

        private SQLQueries sql;
        public Security(IConfiguration configuration)
        {
            sql = new SQLQueries(configuration, typeof(Security));
        }

        public string GetUserRoles()
        {
            return sql.ExecuteReader("[dbo].[GetUserRoles]");
        }
        public string GetCurrentUserRole(string code)
        {
            return "";
        }
    }
}
