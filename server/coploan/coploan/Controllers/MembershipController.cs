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
        [ActionName("edit"), HttpPut("{memberKey}")]
        public ActionResult<bool> UpdateMemberDetails([FromBody]Member data, string memberKey)
        {
            return membership.UpdateMemberDetails(data, memberKey);
        }
        [ActionName("create"), HttpPost("")]
        public ActionResult<int> CreateMember([FromBody] Member data)
        {
            return membership.CreateMember(data);
        }
    }
}
