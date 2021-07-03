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
        public int TransactionKey { get; set; }
        public int MemberKey { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public decimal Interest { get; set; }
        public int Term { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

    }

    public class Transaction
    {
        private SQLQueries sql;
        private IConfiguration config;

        public Transaction(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(config, typeof(TransactionDetails));
        }
        public string GetMembersWithTransactions()
        {
            return sql.ExecuteReader("[dbo].[GetMembersTransaction]");
        }
        public int AddTransaction(TransactionDetails data)
        {
            string keyName = "TransactionKey";
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(TransactionDetails), data, keyName);
            return sql.ExecuteNonQueryInsert("[dbo].[AddTransaction]", sqlParam, keyName);
        }

        public string GetMemberLoan(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(TransactionDetails), typeof(Approval) });

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
