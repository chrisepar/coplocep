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
    public class TransactionDetails
    {
        public string TransactionKey { get; set; }
        public string MemberKey { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public string IsApproved { get; set; }
        public string ApprovedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public class Transaction
    {
        private SQLQueries sql;

        public Transaction(IConfiguration configuration)
        {
            sql = new SQLQueries(configuration, typeof(TransactionDetails));
        }
        public string GetMembersWithTransactions()
        {
            return sql.ExecuteReader("[dbo].[GetMembersTransaction]");
        }
        public int AddTransaction(TransactionDetails data)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            string keyName = "TransactionKey";

            foreach (PropertyInfo item in typeof(TransactionDetails).GetProperties())
            {
                StringBuilder itemSB = new StringBuilder();
                if (item.Name != keyName)
                {
                    itemSB.Append("@").Append(item.Name);
                    sqlParam.Add(new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)));
                }
                else
                {
                    itemSB.Append("@").Append(item.Name);
                    sqlParam.Add(new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)) { Direction = ParameterDirection.Output, DbType = DbType.Int32 });
                }
            }

            return sql.ExecuteNonQueryInsert("[dbo].[AddTransaction]", sqlParam, keyName);
        }

        public string GetMemberLoan(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            return sql.ExecuteReader("[dbo].[GetMemberLoan]", sqlParam);
        }
        public string GetMemberInterestPaid(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            return sql.ExecuteReader("[dbo].[GetMemberInterestPaid]", sqlParam);
        }
        public string GetMemberDeposit(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            return sql.ExecuteReader("[dbo].[GetMemberDeposit]", sqlParam);
        }

        public bool DeleteTransaction(int transactionKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            
            sqlParam.Add(new SqlParameter("@TransactionKey", transactionKey));

            return sql.ExecuteNonQuery("[dbo].[DeleteTransaction]", sqlParam);
        }
    }
}
