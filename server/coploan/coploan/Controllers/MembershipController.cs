using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using coploan.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System.Text.Json;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MembershipController : ControllerBase
    {
        private Membership membership;

        private UserRole CurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out StringValues auth);
            return JsonSerializer.Deserialize<UserRole>(auth[0]);
        }

        public MembershipController(IConfiguration configuration)
        {
            membership = new Membership(configuration);
        }

        [ActionName("list"), HttpGet]
        public ActionResult<string> GetMembers(string memberKey)
        {
            return membership.GetMembers(memberKey, CurrentUser());
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
    }
}
