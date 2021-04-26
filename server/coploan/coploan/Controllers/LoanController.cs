using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using coploan.Models;
using Microsoft.Extensions.Configuration;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LoanController : Controller
    {
        private Loan loan;

        public LoanController(IConfiguration configuration)
        {
            loan = new Loan(configuration);
        }


        [ActionName(""), HttpGet("")]
        public ActionResult<string> GetMemberLoan(string memberKey)
        {
            return loan.GetLoan(memberKey);
        }
    }
}
