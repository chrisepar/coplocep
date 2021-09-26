using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using coploan.Services;
using Microsoft.Extensions.Configuration;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SecurityController : ControllerBase
    {
        private Security security;

        public SecurityController(IConfiguration configuration)
        {
            security = new Security(configuration);
        }
        [ActionName("list"), HttpGet]
        public ActionResult<string> GetUserRoles(string memberKey)
        {
            return security.GetUserRoles();
        }
    }
}
