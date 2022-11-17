USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[LoanApprovalByCurrentUser]    Script Date: 20/06/2021 3:50:53 pm ******/
DROP FUNCTION [dbo].[LoanApprovalByCurrentUser]
GO

/****** Object:  UserDefinedFunction [dbo].[LoanApprovalByCurrentUser]    Script Date: 20/06/2021 3:50:53 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 20, 2021
-- Description:	Membership Approval By User
-- =============================================
CREATE FUNCTION [dbo].[LoanApprovalByCurrentUser] 
(
	@currentUser nvarchar(2)	 
)
RETURNS TABLE 
AS 
RETURN 

SELECT T.TransactionKey, T.MemberKey, T.Amount, T.Interest, T.Term, T.StartDueDate,
T.TypeOfLoan, T.ServiceFee, T.InsuranceAmount, T.FixedDepositAmount, T.DocumentationAmount, T.SavingsDepositAmount,
T.BalancePreviousLoanAmount, T.InterestPreviousLoanAmount,
dbo.GetUserRole(T.CreatedBy) AS [CreatedBy], 
T.CreatedDate, 
dbo.GetUserRole(T.ModifiedBy) AS [ModifiedBy], 
T.ModifiedDate, 
AWE.ApprovalID,
dbo.GetUserRole(AWE.ApprovedBy) AS [LastApprovedBy], 
AWE.ApprovedDate AS [LastApprovedDate], 
AWE.IsApproved AS [LastIsApproved],
AWE.Comment,
AWEC.IsApproved AS [IsApprovedByCurrent],
dbo.IsFinalApproved(T.TransactionKey, 'Loan') AS [IsFinalApproved],
IIF(@currentUser = AWE.ApprovedBy, 'Y', 'N') AS [IsLastApprovedByCurrentUser]
FROM Loans T
	OUTER APPLY (SELECT TOP 1 * FROM TransactionWorkflow AW WHERE AW.RecordID = T.TransactionKey ORDER BY AW.ApprovedDate DESC) AS AWE
	OUTER APPLY (SELECT TOP 1 * FROM TransactionWorkflow AWC WHERE AWC.RecordID = T.TransactionKey AND AWC.ApprovedBy = @currentUser ORDER BY AWC.ApprovedDate DESC) AS AWEC

GO


