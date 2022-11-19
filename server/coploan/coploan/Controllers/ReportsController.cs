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
    public class ReportsController : Controller
    {
        private Reports reports;

        public ReportsController(IConfiguration configuration)
        {
            reports = new Reports(configuration);
        }

        [ActionName("download/membership"), HttpGet]
        public ActionResult<string> DownloadMembership()
        {
            return reports.DownloadMembership();
        }
    }
}
