using coploan.Common;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Text;

namespace coploan.Models
{
    public class Loan
    {
        private readonly IConfiguration _configuration;
        private SQLQueries sql;

        public Loan(IConfiguration configuration)
        {
            sql = new SQLQueries(configuration);
        }
        public string GetLoan(string memberKey)
        {
            SqlCommand command = new SqlCommand();
            StringBuilder sb = new StringBuilder();
            sb.Append(@"SELECT t.* FROM Transactions t
                        LEFT JOIN Members m ON m.MemberKey = t.MemberKey WHERE m.MemberKey = @memberKey");

            command.Parameters.Add(new SqlParameter("@memberKey", memberKey));

            command.CommandText = sb.ToString();
            return sql.Query(command);
        }
    }
}
