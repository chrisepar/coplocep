using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coploan.Models;
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

        [ActionName("Approve"), HttpPost]
        public ActionResult<bool> ApproveRecord([FromBody] Approval data)
        {
            return approvalWorkflow.ApproveRecord(data);
        }

        //[ActionName("Reject"), HttpPost]
        //public ActionResult<bool> RejectRecord([FromBody] Approval data)
        //{
        //    return approvalWorkflow.RejectRecord(data);
        //}
    }
}
