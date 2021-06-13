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

        public bool ApproveRecord(Approval data)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            List<string> included = new List<string>() { "RecordID", "Category", "ApprovedBy", "ApprovedDate", "Comment" };

            foreach (PropertyInfo item in typeof(Approval).GetProperties())
            {
                if (included.Contains(item.Name))
                {
                    StringBuilder itemSB = new StringBuilder();
                    itemSB.Append("@").Append(item.Name);
                    sqlParam.Add(new SqlParameter(itemSB.ToString(), Helpers.isEmpty(item.GetValue(data)) ? DBNull.Value : item.GetValue(data)));
                }
            }
            return sql.ExecuteNonQuery("[dbo].[ApproveRecord]", sqlParam);
        }
    }

}
