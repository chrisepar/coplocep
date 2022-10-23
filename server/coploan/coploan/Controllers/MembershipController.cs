using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using coploan.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System.Text.Json;
using coploan.Common;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MembershipController : ControllerHandler
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
        
        [ActionName("edit"), HttpPut]
        public ActionResult<bool> UpdateMemberDetails([FromBody]Member data)
        {
            return membership.UpdateMemberDetails(data);
        }

        [ActionName("create"), HttpPost]
        public ActionResult<int> CreateMember([FromBody] Member data)
        {
            return membership.CreateMember(data);
        }

        [ActionName("delete"), HttpDelete("{memberKey}")]
        public ActionResult<bool> DeleteMember(int memberKey)
        {
            return membership.DeleteMember(memberKey);
        }
    }
}
