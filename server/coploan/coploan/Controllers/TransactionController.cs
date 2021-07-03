using Microsoft.AspNetCore.Mvc;
using coploan.Models;
using Microsoft.Extensions.Configuration;

namespace coploan.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TransactionController : ControllerBase
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

        [ActionName("add"), HttpPost("")]
        public ActionResult<int> AddTransaction([FromBody] TransactionDetails data)
        {
            return transaction.AddTransaction(data);
        }

        [ActionName("delete"), HttpDelete("{transactionKey}")]
        public ActionResult<bool> DeleteTransaction(int transactionKey)
        {
            return transaction.DeleteTransaction(transactionKey);
        }        

        [ActionName("loan"), HttpGet("{memberKey}")]
        public ActionResult<string> GetMemberLoan(string memberKey)
        {
            return transaction.GetMemberLoan(memberKey);
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
    }
}
