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
    public class Setting
    {
        public int Interest { get; set; }
        public int Term { get; set; }
    }

    public class SettingsService
    {
        private SQLQueries sql;
        private IConfiguration config;

        public SettingsService(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(config, typeof(Setting));
        }

        public string GetSettings()
        {
            return sql.ExecuteReader("[dbo].[GetSettings]");
        }

        public bool SaveSettings(Setting data)
        {
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Setting), data);
            return sql.ExecuteNonQuery("[dbo].[SaveSettings]", sqlParam);
        }

    }
}
