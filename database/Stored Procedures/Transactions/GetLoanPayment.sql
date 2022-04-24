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
	   P.[LoanKey] AS [TransactionKey]
      ,P.[MemberKey]
      ,P.[Amount]
      ,P.[CreatedBy]
      ,P.[CreatedDate]
      ,P.[ModifiedBy]
      ,P.[ModifiedDate]
	  FROM Payments P
		LEFT JOIN Loans L ON L.TransactionKey = P.LoanKey
		WHERE L.TransactionKey = @loanID
END
GO


