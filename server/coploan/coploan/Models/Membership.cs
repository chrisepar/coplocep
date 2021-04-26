using coploan.Common;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace coploan.Models
{
    public class Member
    {
        public string MemberKey { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string TinNumber { get; set; }
        public string DateAccepted { get; set; }
        public string IsAccepted { get; set; }
        public string BODResolutionNumber { get; set; }
        public string TypeOfMembership { get; set; }
        public string SharesSubscribed { get; set; }
        public string AmountSubscribed { get; set; }
        public string InitialPaidUp { get; set; }
        public string Address { get; set; }
        public string CivilStatus { get; set; }
        public DateTime Birthdate { get; set; }
        public string Birthplace { get; set; }
        public string Occupation { get; set; }
        public int Salary { get; set; }
        public string OtherIncome { get; set; }
        public string EducationalAttainment { get; set; }
        public string SpouseName { get; set; }
        public int Dependencies { get; set; }
        public string OtherCooperative { get; set; }
        public string Trainings { get; set; }
        public string CreditReferences { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
    public class Membership
    {
        private SQLQueries sql;

        public Membership(IConfiguration configuration)
        {
            sql = new SQLQueries(configuration);
        }
        public string GetMembers(string memberKey)
        {
            SqlCommand command = new SqlCommand();
            StringBuilder sb = new StringBuilder();
            sb.Append(@"SELECT *, 
                        LastName + ', ' + FirstName + ' ' + MiddleName AS [Name] FROM Members");

            if (!string.IsNullOrEmpty(memberKey))
            {
                sb.Append(" Where MemberKey = @memberKey");
                command.Parameters.Add(new SqlParameter("@memberKey", memberKey));
            }

            command.CommandText = sb.ToString();
            return sql.Query(command);
        }

        public string GetMembersWithLoan()
        {
            SqlCommand command = new SqlCommand();
            StringBuilder sb = new StringBuilder();
            sb.Append(@"SELECT [MemberKey],
                        [Name],
                        CONVERT(DECIMAL(18,2),[Loan]) AS [LoanAmount],
                        CONVERT(DECIMAL(18,2),[Deposit]) AS [DepositAmount],
                        CONVERT(DECIMAL(18,2),[Interest]) AS [InterestPaidAmount],
                        CONVERT(DECIMAL(18,2),[Share]) AS [AverageShareAmount]
                        FROM
                        (
	                        SELECT T.MemberKey AS [MemberKey],
	                        LastName + ', ' + FirstName + ' ' + MiddleName AS [Name], 
	                        [Category], [Amount] FROM Transactions T
	                        LEFT JOIN Members M ON M.MemberKey = T.MemberKey
                        ) AS SourceTable PIVOT(AVG([Amount]) FOR [Category] IN (
                        [Loan], 
                        [Deposit], 
                        [Interest], 
                        [Share])) AS PivotTable"
            );
            command.CommandText = sb.ToString();
            return sql.Query(command);
        }

        public bool UpdateMemberDetails(dynamic data, string memberKey)
        {
            bool isSuccess = false;
            SqlCommand command = new SqlCommand();
            StringBuilder sb = new StringBuilder();

            Dictionary<string, string> obj = JsonConvert.DeserializeObject<Dictionary<string, string>>(Convert.ToString(data));

            sb.Append("UPDATE [dbo].[Members] SET ");
            sb.Append(@"[FirstName] = @FirstName
                      ,[MiddleName] = @MiddleName
                      ,[LastName] = @LastName
                      ,[TinNumber] = @TinNumber
                      ,[DateAccepted] = @DateAccepted
                      ,[IsAccepted] = @IsAccepted
                      ,[BODResolutionNumber] = @BODResolutionNumber
                      ,[TypeOfMembership] = @TypeOfMembership
                      ,[SharesSubscribed] = @SharesSubscribed
                      ,[AmountSubscribed] = @AmountSubscribed
                      ,[InitialPaidUp] = @InitialPaidUp
                      ,[Address] = @Address
                      ,[CivilStatus] = @CivilStatus
                      ,[Birthdate] = @Birthdate
                      ,[Birthplace] = @Birthplace
                      ,[Occupation] = @Occupation
                      ,[Salary] = @Salary
                      ,[OtherIncome] = @OtherIncome
                      ,[EducationalAttainment] = @EducationalAttainment
                      ,[SpouseName] = @SpouseName
                      ,[Dependencies] = @Dependencies
                      ,[OtherCooperative] = @OtherCooperative
                      ,[Trainings] = @Trainings
                      ,[CreditReferences] = @CreditReferences
                      ,[CreatedBy] = @CreatedBy
                      ,[CreatedDate] =  @CreatedDate
                      ,[ModifiedBy] = @ModifiedBy
                      ,[ModifiedDate] = @ModifiedDate
                 WHERE MemberKey = @MemberKey");

            foreach(KeyValuePair<string, string> item in obj)
            {
                StringBuilder itemSB = new StringBuilder();
                itemSB.Append("@").Append(item.Key);
                command.Parameters.Add(new SqlParameter(itemSB.ToString(), item.Value is null ? DBNull.Value : item.Value));                    
            }

            command.CommandText = sb.ToString();
            sql.Query(command);
            return isSuccess;
        }
    }
}
