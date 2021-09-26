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
    public class TransactionController : ControllerBase
    {
        private Transaction transaction;
        private UserRole CurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out StringValues auth);
            return JsonSerializer.Deserialize<UserRole>(auth[0]);
        }

        public TransactionController(IConfiguration configuration)
        {
            transaction = new Transaction(configuration);
        }

        [ActionName("list"), HttpGet]
        public ActionResult<string> GetMembersWithTransactions()
        {
            return transaction.GetMembersWithTransactions();
        }

        [ActionName("add/loan"), HttpPost("")]
        public ActionResult<int> AddLoan([FromBody] LoanDetails data)
        {
            return transaction.AddLoan(data);
        }
        [ActionName("add/deposit"), HttpPost("")]
        public ActionResult<int> AddDeposit([FromBody] DepositDetails data)
        {
            return transaction.AddDeposit(data);
        }
        [ActionName("add/payment"), HttpPost("")]
        public ActionResult<int> AddPayment([FromBody] PaymentDetails data)
        {
            return transaction.AddPayment(data);
        }

        [ActionName("delete/loan"), HttpDelete("{transactionKey}")]
        public ActionResult<bool> DeleteLoan(int transactionKey)
        {
            return transaction.DeleteLoan(transactionKey, CurrentUser());
        }
        [ActionName("delete/deposit"), HttpDelete("{transactionKey}")]
        public ActionResult<bool> DeleteDeposit(int transactionKey)
        {
            return transaction.DeleteDeposit(transactionKey);
        }

        [ActionName("loan"), HttpGet("{memberKey}")]
        public ActionResult<string> GetMemberLoan(string memberKey)
        {
            return transaction.GetMemberLoan(memberKey, CurrentUser());
        }

        [ActionName("deposit"), HttpGet("{memberKey}")]
        public ActionResult<string> GetMemberDeposit(string memberKey)
        {
            return transaction.GetMemberDeposit(memberKey);
        }

        [ActionName("interest"), HttpGet("{memberKey}")]
        public ActionResult<string> GetMemberInterestPaid(string memberKey)
        {
            return transaction.GetMemberInterestPaid(memberKey);
        }

        [ActionName("calculation"), HttpGet]
        public ActionResult DownloadFile(float amount, float interest, int term)
        {
            byte[] result = transaction.GetComputedMonthlyLoan(amount, interest, term);
            return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Computation.xlsx");
        }
    }
}
