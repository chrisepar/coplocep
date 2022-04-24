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
    public class SettingsController : ControllerHandler
    {
        private SettingsService settings;

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
