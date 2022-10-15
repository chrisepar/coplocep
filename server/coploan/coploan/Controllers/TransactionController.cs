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
    public class TransactionController : ControllerHandler
    {
        private Transaction transaction;
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
            return transaction.DeleteLoan(transactionKey);
        }
        [ActionName("delete/deposit"), HttpDelete("{transactionKey}")]
        public ActionResult<bool> DeleteDeposit(int transactionKey)
        {
            return transaction.DeleteDeposit(transactionKey);
        }
        [ActionName("delete/payment"), HttpDelete("{transactionKey}")]
        public ActionResult<bool> DeletePayment(int transactionKey)
        {
            return transaction.DeletePayment(transactionKey);
        }

        [ActionName("loan/list"), HttpGet("{memberKey}")]
        public ActionResult<string> GetMemberLoan(string memberKey)
        {
            return transaction.GetMemberLoan(memberKey);
        }

        [ActionName("loan"), HttpGet("{loanID}")]
        public ActionResult<string> GetLoan(string loanID)
        {
            //For deletion
            return transaction.GetLoan(loanID);
        }

        [ActionName("deposit/list"), HttpGet("{memberKey}")]
        public ActionResult<string> GetMemberDeposit(string memberKey)
        {
            return transaction.GetMemberDeposit(memberKey);
        }

        [ActionName("interest/list"), HttpGet("{loanID}")]
        public ActionResult<string> GetMemberInterestPaid(string loanID)
        {
            return transaction.GetMemberInterestPaid(loanID);
        }

        [ActionName("payment/list"), HttpGet("{loanID}")]
        public ActionResult<string> GetMemberPayment(string loanID) => transaction.GetMemberPayment(loanID);

        [ActionName("loan/details"), HttpGet("{loanID}")]
        public ActionResult<string> GetLoanPaymentDetails(string loanID) => transaction.GetLoanPaymentDetails(loanID);

        [ActionName("calculation"), HttpGet]
        public ActionResult DownloadFile(string memberKey, float amount, float interest, int term)
        {
            string fileName;
            byte[] result = transaction.GetComputedMonthlyLoan(memberKey, out fileName, amount, interest, term);
            return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName + ".xlsx");
        }
    }
}
