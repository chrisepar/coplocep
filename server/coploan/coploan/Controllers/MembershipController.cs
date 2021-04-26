using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coploan.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MembershipController : Controller
    {
        private Membership membership;

        public MembershipController(IConfiguration configuration)
        {
            membership = new Membership(configuration);
        }

        [ActionName("list"), HttpGet]
        public ActionResult<string> GetMembers(string memberKey)
        { 
            return membership.GetMembers(memberKey);
        }

        [ActionName("loans"), HttpGet]
        public ActionResult<string> GetMembersWithLoan()
        {
            return membership.GetMembersWithLoan();
        }
        [ActionName("edit"), HttpPost("{memberKey}")]
        public ActionResult<string> UpdateMemberDetails([FromBody]dynamic data, string memberKey)
        {
            membership.UpdateMemberDetails(data, memberKey);
            return "Strong";
        }
    }
}
