using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using coploan.Services;
using Microsoft.Extensions.Configuration;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ApprovalWorkflowController : Controller
    {
        private ApprovalWorkflow approvalWorkflow;

        public ApprovalWorkflowController(IConfiguration configuration)
        {
            approvalWorkflow = new ApprovalWorkflow(configuration);
        }

        [ActionName("Approve/membership"), HttpPost]
        public ActionResult<bool> ApproveMembershipRecord([FromBody] Approval data)
        {
            return approvalWorkflow.ApproveMembershipRecord(data);
        }

        [ActionName("Approve/transaction"), HttpPost]
        public ActionResult<bool> ApproveTransactionRecord([FromBody] Approval data)
        {
            return approvalWorkflow.ApproveTransactionRecord(data);
        }

        [ActionName("Reject/membership"), HttpPost]
        public ActionResult<bool> RejectMembershipRecord([FromBody] Approval data)
        {
            return approvalWorkflow.RejectMembershipRecord(data);
        }

        [ActionName("Reject/transaction"), HttpPost]
        public ActionResult<bool> RejectTransactionRecord([FromBody] Approval data)
        {
            return approvalWorkflow.RejectTransactionRecord(data);
        }

        [ActionName("Timeline/membership"), HttpGet("{recordID}")]
        public ActionResult<string> GetMembershipTimeline(int recordID)
        {
            return approvalWorkflow.GetMembershipTimeline(recordID);
        }

        [ActionName("Timeline/transaction"), HttpGet("{category}/{recordID}")]
        public ActionResult<string> GetTransactionTimeline(string category, int recordID)
        {
            return approvalWorkflow.GetTransactionTimeline(category, recordID);
        }
        //[ActionName("list"), HttpGet]
        //public ActionResult<bool> GetApprovalList(int recordID)
        //{
        //    return approvalWorkflow.RejectRecord(data);
        //}
    }
}
