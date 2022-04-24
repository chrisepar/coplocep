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

    public class SettingsService : BusinessObjects
    {
        private SQLQueries sql;

        public SettingsService(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(config, typeof(Setting));
        }

        public string GetSettings()
        {
            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetSettings]"));
        }

        public bool SaveSettings(Setting data)
        {
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Setting), data);
            return sql.ExecuteNonQuery("[dbo].[SaveSettings]", sqlParam);
        }

    }
}
