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
