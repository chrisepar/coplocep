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
    public class Reports: BusinessObjects
    {
        public Reports(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(config);
        }
        private SQLQueries sql;
        public string DownloadMembership()
        {
            DataTable results = sql.ExecuteReader("[dbo].[DownloadMembership]");
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }
    }
}
