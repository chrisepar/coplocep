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
    public class Member
    {
        public int MemberKey { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string TinNumber { get; set; }
        public string BODResolutionNumber { get; set; }
        public string TypeOfMembership { get; set; }
        public decimal SharesSubscribed { get; set; }
        public decimal AmountSubscribed { get; set; }
        public decimal InitialPaidUp { get; set; }
        public string Address { get; set; }
        public string CivilStatus { get; set; }
        public DateTime Birthdate { get; set; }
        public string Birthplace { get; set; }
        public string Occupation { get; set; }
        public decimal Salary { get; set; }
        public string OtherIncome { get; set; }
        public string EducationalAttainment { get; set; }
        public string SpouseName { get; set; }
        public int Dependencies { get; set; }
        public string OtherCooperative { get; set; }
        public string Trainings { get; set; }
        public string CreditReferences { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
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

            return sql.ExecuteReader("[dbo].[GetMemberhip]", sqlParam);
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
