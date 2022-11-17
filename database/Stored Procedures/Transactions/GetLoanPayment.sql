USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberInterestPaid]    Script Date: 24/05/2021 9:38:31 pm ******/
DROP PROCEDURE [dbo].[GetLoanPayment]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberInterestPaid]    Script Date: 24/05/2021 9:38:31 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 24, 2021
-- Description:	Get Member Interest Paid
-- =============================================
CREATE PROCEDURE [dbo].[GetLoanPayment] 
	-- Add the parameters for the stored procedure here
	@loanID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	SELECT 
	   L.TransactionKey AS [LoanKey] 
	  ,P.[MemberKey]
      ,SUM(P.[Amount]) AS [PaidAmount]
	  ,L.Amount - SUM(COALESCE(P.[Amount],0) - COALESCE(P.[Interest],0) - COALESCE(P.[Penalty],0)) AS [UnpaidAmount]
	  ,L.[Amount] AS [LoanAmount]
	  ,L.Interest AS [Interest]
		FROM Loans L
		LEFT JOIN Payments P ON L.TransactionKey = P.LoanKey
		WHERE L.TransactionKey = @loanID
		GROUP BY L.TransactionKey, P.MemberKey, L.Amount, L.Interest
END
GO


