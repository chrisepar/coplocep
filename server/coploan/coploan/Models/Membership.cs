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
        public string DateAccepted { get; set; }
        public string IsAccepted { get; set; }
        public string BODResolutionNumber { get; set; }
        public string TypeOfMembership { get; set; }
        public decimal SharesSubscribed { get; set; }
        public decimal AmountSubscribed { get; set; }
        public decimal InitialPaidUp { get; set; }
        public string Address { get; set; }
        public string CivilStatus { get; set; }
        public string Birthdate { get; set; }
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

        public Membership(IConfiguration configuration)
        {
            sql = new SQLQueries(configuration, typeof(Member));
        }
        public string GetMembers(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            return sql.ExecuteReader("[dbo].[GetMemberhip]", sqlParam);
        }        

        public bool UpdateMemberDetails(Member data, string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            foreach (PropertyInfo item in typeof(Member).GetProperties())
            {
                StringBuilder itemSB = new StringBuilder();
                itemSB.Append("@").Append(item.Name);
                sqlParam.Add(new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)));
            }

            return sql.ExecuteNonQuery("[dbo].[UpdateMembership]", sqlParam);
        }
        public int CreateMember(Member data)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            string keyName = "MemberKey";

            foreach (PropertyInfo item in typeof(Member).GetProperties())
            {
                StringBuilder itemSB = new StringBuilder();
                if (item.Name != keyName)
                {
                    itemSB.Append("@").Append(item.Name);
                    sqlParam.Add(new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)));
                } else
                {
                    itemSB.Append("@").Append(item.Name);
                    sqlParam.Add(new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)) { Direction = ParameterDirection.Output, DbType = DbType.Int32 });
                }
            }
            return sql.ExecuteNonQueryInsert("[dbo].[InsertMembership]", sqlParam, keyName);
        }
    }
}
