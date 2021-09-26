using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
}
