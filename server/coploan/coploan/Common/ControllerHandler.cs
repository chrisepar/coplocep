using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using coploan.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System.Text.Json;
using coploan.Common;
using System;
using Microsoft.AspNetCore.Mvc.Filters;

namespace coploan.Common
{
    public class ControllerHandler: Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            BusinessObjects.InitFilters(Request.Query);
            BusinessObjects.InitCurrentUser(this.CurrentUser());
        }

        public UserRole CurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out StringValues auth);
            return JsonSerializer.Deserialize<UserRole>(auth[0]);
        }
    }
}
