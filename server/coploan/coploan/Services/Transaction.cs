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
            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetMembersTransaction]"));
        }

        public int AddLoan(LoanDetails data)
        {
            string keyName = "TransactionKey";
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(LoanDetails), data, keyName);
            return sql.ExecuteNonQueryInsert("[dbo].[AddLoan]", sqlParam, keyName);
        }
        public int AddDeposit(DepositDetails data)
        {
            string keyName = "TransactionKey";
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(DepositDetails), data, keyName);
            return sql.ExecuteNonQueryInsert("[dbo].[AddDeposit]", sqlParam, keyName);
        }
        public int AddPayment(PaymentDetails data)
        {
            string keyName = "TransactionKey";
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(InterestDetails), data, keyName);
            return sql.ExecuteNonQueryInsert("[dbo].[AddPayment]", sqlParam, keyName);
        }
        public string GetMemberLoan(string memberKey, UserRole currentUser)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(LoanDetails), typeof(Approval) });

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            sqlParam.Add(new SqlParameter("@currentUser", currentUser.Code));
            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetMemberLoan]", sqlParam));
        }
        public string GetMemberInterestPaid(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(InterestDetails)});

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetMemberInterestPaid]", sqlParam));
        }
        public string GetMemberDeposit(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(DepositDetails) });

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetMemberDeposit]", sqlParam));
        }

        public bool DeleteLoan(int transactionKey, UserRole currentUser)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            
            sqlParam.Add(new SqlParameter("@LoanKey", transactionKey));
            sqlParam.Add(new SqlParameter("@currentUser", currentUser.Code));

            return sql.ExecuteNonQuery("[dbo].[DeleteLoan]", sqlParam);
        }

        public bool DeleteDeposit(int transactionKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sqlParam.Add(new SqlParameter("@DepositKey", transactionKey));

            return sql.ExecuteNonQuery("[dbo].[DeleteTransaction]", sqlParam);
        }

        public byte[] GetComputedMonthlyLoan (float amount = 0,  float interest = 0, int term = 0)
        {
            sql = new SQLQueries(config, typeof(LoanComputation));
            FileHandler fileHandler = new FileHandler();
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sqlParam.Add(new SqlParameter("@amount", amount));
            sqlParam.Add(new SqlParameter("@interest", interest));
            sqlParam.Add(new SqlParameter("@term", term));

            DataTable dt = sql.ExecuteReader("[dbo].[GetComputedMonthlyLoan]", sqlParam);
            return fileHandler.DownloadFile(dt, "Computation");
        }
    }
}
