using coploan.Common;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;
using coploan.Models;

namespace coploan.Services
{    
    public class Security : BusinessObjects
    {

        private SQLQueries sql;
        public Security(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(configuration, typeof(Security));
        }

        public string GetUserRoles()
        {
            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetUserRoles]"));
        }
        public string GetCurrentUserRole(string code)
        {
            return "";
        }
    }
}
