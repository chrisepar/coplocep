USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberLoan]    Script Date: 23/05/2021 9:33:49 pm ******/
DROP PROCEDURE [dbo].[GetMemberLoan]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberLoan]    Script Date: 23/05/2021 9:33:49 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 23, 2021
-- Description:	Get Member Loan
-- =============================================
CREATE PROCEDURE [dbo].[GetMemberLoan] 
	-- Add the parameters for the stored procedure here
	@memberKey int,
	@currentUser nvarchar(2)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT TA.[TransactionKey]
      ,TA.[MemberKey]
      ,TA.[Amount]
	  ,TA.Amount - SUM(COALESCE(P.[Amount],0) - COALESCE(P.[Interest],0) - COALESCE(P.[Penalty],0)) AS [Balance]
	  ,TA.[Interest]
	  ,TA.[Term]
	  ,TA.[StartDueDate]
	  ,TA.TypeOfLoan, TA.ServiceFee, TA.InsuranceAmount
	  ,TA.FixedDepositAmount, TA.DocumentationAmount, TA.SavingsDepositAmount
 	  ,TA.BalancePreviousLoanAmount, TA.InterestPreviousLoanAmount
      ,TA.[CreatedBy]
      ,TA.[CreatedDate]
      ,TA.[ModifiedBy]
      ,TA.[ModifiedDate]
      ,TA.[ApprovalID]
      ,TA.[LastApprovedBy] As [ApprovedBy]
      ,TA.[LastApprovedDate] AS [ApprovedDate]
      ,TA.[LastIsApproved] AS [IsApproved]
      ,TA.[Comment] FROM [LoanApprovalByCurrentUser](@currentUser) AS TA
		LEFT JOIN Payments AS P ON TA.TransactionKey = P.LoanKey
	WHERE TA.MemberKey = @memberKey
	GROUP BY TA.TransactionKey, TA.MemberKey, TA.Amount, TA.Interest, TA.Term, TA.StartDueDate, TA.CreatedBy, TA.CreatedDate,
	TA.ModifiedBy, TA.ModifiedDate, TA.ApprovalID, TA.LastApprovedBy, TA.LastApprovedDate, TA.LastIsApproved, TA.Comment,
	TA.TypeOfLoan, TA.ServiceFee, TA.InsuranceAmount ,TA.FixedDepositAmount, TA.DocumentationAmount, TA.SavingsDepositAmount,
 	TA.BalancePreviousLoanAmount, TA.InterestPreviousLoanAmount
END
GO