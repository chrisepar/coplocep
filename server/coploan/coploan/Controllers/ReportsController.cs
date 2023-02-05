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
        public ActionResult DownloadTable(string category)
        {
            string fileName = "Membership";
            byte[] result = reports.DownloadMembership();
            return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName + ".xlsx");
        }
    }
}
