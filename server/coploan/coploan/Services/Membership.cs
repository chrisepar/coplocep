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
    public class Membership
    {
        private SQLQueries sql;
        private IConfiguration config;

        public Membership(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(config, typeof(Member));
        }
        public string GetMembers(string memberKey, UserRole currentUser)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config);

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }

            sqlParam.Add(new SqlParameter("@currentUser", currentUser.Code));

            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetMemberhip]", sqlParam));
        }        

        public bool UpdateMemberDetails(Member data)
        {
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Member), data);
            return sql.ExecuteNonQuery("[dbo].[UpdateMembership]", sqlParam);
        }
        public int CreateMember(Member data)
        {
            string keyName = "MemberKey";
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Member), data, keyName);
            return sql.ExecuteNonQueryInsert("[dbo].[InsertMembership]", sqlParam, keyName);
        }
    }
}
