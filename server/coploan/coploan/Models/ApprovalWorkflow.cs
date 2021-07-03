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
    public class Approval
    {
        public int ApprovalID { get; set; }
        public int RecordID { get; set; }
        public string Category { get; set; }
        public DateTime ApprovedDate { get; set; }
        public string ApprovedBy { get; set; }
        public string IsApproved { get; set; }
        public string Comment { get; set; }
    }
    public class ApprovalWorkflow
    {

        private SQLQueries sql;
        private IConfiguration config;
        public ApprovalWorkflow(IConfiguration configuration)
        {
            config = configuration;
            sql = new SQLQueries(configuration, typeof(Approval));
        }

        public bool ApproveMembershipRecord(Approval data)
        {
            List<string> included = new List<string>() { "RecordID", "Category", "ApprovedBy", "ApprovedDate", "Comment" };
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Approval), data, included);

            return sql.ExecuteNonQuery("[dbo].[ApproveMembershipRecord]", sqlParam);
        }

        public bool ApproveTransactionRecord(Approval data)
        {
            List<string> included = new List<string>() { "RecordID", "Category", "ApprovedBy", "ApprovedDate", "Comment" };
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Approval), data, included);

            return sql.ExecuteNonQuery("[dbo].[ApproveTransactionRecord]", sqlParam);
        }

        public bool RejectMembershipRecord(Approval data)
        {            
            List<string> included = new List<string>() { "RecordID", "Category", "ApprovedBy", "ApprovedDate", "Comment" };
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Approval), data, included);

            return sql.ExecuteNonQuery("[dbo].[RejectMembershipRecord]", sqlParam);
        }
        public bool RejectTransactionRecord(Approval data)
        {
            List<string> included = new List<string>() { "RecordID", "Category", "ApprovedBy", "ApprovedDate", "Comment" };
            List<SqlParameter> sqlParam = sql.GenerateSQLParamFromInstance(typeof(Approval), data, included);

            return sql.ExecuteNonQuery("[dbo].[RejectTransactionRecord]", sqlParam);
        }

        public string GetMembershipTimeline(int recordID)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config);

            sqlParam.Add(new SqlParameter("@RecordID", recordID));

            return sql.ExecuteReader("[dbo].[GetMembershipTimeline]", sqlParam);
        }

        public string GetTransactionTimeline(string category, int recordID)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();

            sql = new SQLQueries(config);

            sqlParam.Add(new SqlParameter("@RecordID", recordID));
            sqlParam.Add(new SqlParameter("@Category", category));

            return sql.ExecuteReader("[dbo].[GetTransactionTimeline]", sqlParam);
        }

    }

}
