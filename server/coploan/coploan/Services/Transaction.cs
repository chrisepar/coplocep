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

    public class Transaction: BusinessObjects
    {
        private SQLQueries sql;

        public Transaction(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(config, typeof(TransactionDetails));
        }
        public string GetMembersWithTransactions()
        {
            DataTable results = sql.ExecuteReader("[dbo].[GetMembersTransaction]");
            return JsonConvert.SerializeObject(GetDataByPage(results));
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
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(PaymentDetails), data, keyName);
            return sql.ExecuteNonQueryInsert("[dbo].[AddPayment]", sqlParam, keyName);
        }
        public string GetMemberLoan(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(LoanDetailsBalance), typeof(Approval) });

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            sqlParam.Add(new SqlParameter("@currentUser", currentUser.Code));
            DataTable results = sql.ExecuteReader("[dbo].[GetMemberLoan]", sqlParam);
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }
        public string GetLoan(string loanID)
        {
            //For Deletion
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(LoanDetails), typeof(Approval) });

            if (!string.IsNullOrEmpty(loanID))
            {
                sqlParam.Add(new SqlParameter("@loanID", loanID));
            }
            sqlParam.Add(new SqlParameter("@currentUser", currentUser.Code));

            DataTable results = sql.ExecuteReader("[dbo].[GetLoan]", sqlParam);
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }

        public string GetLoanPaymentDetails(string loanID)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(LoanPaymentDetails) });

            if (!string.IsNullOrEmpty(loanID))
            {
                sqlParam.Add(new SqlParameter("@loanID", loanID));
            }
            DataTable results = sql.ExecuteReader("[dbo].[GetLoanPayment]", sqlParam);
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }
        public string GetMemberInterestPaid(string loanID)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(InterestDetails)});

            if (!string.IsNullOrEmpty(loanID))
            {
                sqlParam.Add(new SqlParameter("@loanID", loanID));
            }
            DataTable results = sql.ExecuteReader("[dbo].[GetMemberInterestPaid]", sqlParam);
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }
        public string GetMemberDeposit(string memberKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(DepositDetails) });

            if (!string.IsNullOrEmpty(memberKey))
            {
                sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            }
            DataTable results = sql.ExecuteReader("[dbo].[GetMemberDeposit]", sqlParam);
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }

        public string GetMemberPayment(string loanID)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config, new Type[] { typeof(PaymentDetails) });

            if (!string.IsNullOrEmpty(loanID))
            {
                sqlParam.Add(new SqlParameter("@loanID", loanID));
            }
            DataTable results = sql.ExecuteReader("[dbo].[GetMemberPayment]", sqlParam);
            return JsonConvert.SerializeObject(GetDataByPage(results));
        }

        public bool DeleteLoan(int transactionKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            
            sqlParam.Add(new SqlParameter("@LoanKey", transactionKey));

            return sql.ExecuteNonQuery("[dbo].[DeleteLoan]", sqlParam);
        }

        public bool DeleteDeposit(int transactionKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sqlParam.Add(new SqlParameter("@DepositKey", transactionKey));

            return sql.ExecuteNonQuery("[dbo].[DeleteDeposit]", sqlParam);
        }

        public bool DeletePayment(int transactionKey)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sqlParam.Add(new SqlParameter("@PaymentKey", transactionKey));

            return sql.ExecuteNonQuery("[dbo].[DeletePayment]", sqlParam);
        }

        public string GetTypeOfLoans()
        {
            sql = new SQLQueries(config, typeof(Security));

            return JsonConvert.SerializeObject(sql.ExecuteReader("[dbo].[GetTypeOfLoans]"));
        }

        public byte[] GetComputedMonthlyLoan (string memberKey, out string fileName, float amount = 0,  float interest = 0, int term = 0)
        {
            sql = new SQLQueries(config, typeof(LoanComputation));
            FileHandler fileHandler = new FileHandler();
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            // Get Loan Computation
            sqlParam.Add(new SqlParameter("@amount", amount));
            sqlParam.Add(new SqlParameter("@interest", interest));
            sqlParam.Add(new SqlParameter("@term", term));

            DataTable computationDatatable = sql.ExecuteReader("[dbo].[GetComputedMonthlyLoan]", sqlParam);

            // Get Member Details
            sql = new SQLQueries(config, typeof(Membership));
            sqlParam = new List<SqlParameter>();
            sqlParam.Add(new SqlParameter("@memberKey", memberKey));
            sqlParam.Add(new SqlParameter("@currentUser", currentUser.Code));

            DataTable customerDataTable = sql.ExecuteReader("[dbo].[GetMemberhip]", sqlParam);

            // Out String fileName
            fileName = customerDataTable.Rows[0]["Name"].ToString();

            return fileHandler.DownloadComputation(computationDatatable, customerDataTable, amount);
        }
    }
}
