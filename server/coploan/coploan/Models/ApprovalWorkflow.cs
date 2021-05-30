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
        public int ID { get; set; }
        public int RecordID { get; set; }
        public string Category { get; set; }
        public DateTime ApprovedDate { get; set; }
        public string ApprovedBy { get; set; }
    }
    public class ApprovalWorkflow
    {

        private SQLQueries sql;
        public ApprovalWorkflow(IConfiguration configuration)
        {
            sql = new SQLQueries(configuration, typeof(Approval));
        }
    }
}
