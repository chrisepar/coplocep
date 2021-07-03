using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System.Text.Json;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SettingsController : ControllerBase
    {
        private SettingsService settings;

        private UserRole CurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out StringValues auth);
            return JsonSerializer.Deserialize<UserRole>(auth[0]);
        }

        public SettingsController(IConfiguration configuration)
        {
            settings = new SettingsService(configuration);
        }

        [ActionName(""), HttpGet ]
        public ActionResult<string> GetSettings()
        {
            return settings.GetSettings();
        }

        [ActionName("save"), HttpPut]
        public ActionResult<bool> SaveSettings([FromBody] Setting data)
        {
            return settings.SaveSettings(data);
        }
    }
}
