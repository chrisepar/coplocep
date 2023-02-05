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
        public byte[] DownloadMembership()
        {
            FileHandler fileHandler = new FileHandler();
            DataTable results = sql.ExecuteReader("[dbo].[DownloadMembership]");

            return fileHandler.DownloadTable(results, "Membership");
            //return JsonConvert.SerializeObject(GetDataByPage(results));
        }
    }
}
