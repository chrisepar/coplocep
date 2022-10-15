USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetLoan]    Script Date: 30/01/2022 3:56:38 pm ******/
DROP PROCEDURE [dbo].[GetLoan]
GO

/****** Object:  StoredProcedure [dbo].[GetLoan]    Script Date: 30/01/2022 3:56:38 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: January 30, 2022
-- Description:	Get Specific Loan
-- =============================================
CREATE PROCEDURE [dbo].[GetLoan] 
	-- Add the parameters for the stored procedure here
	@loanID int,
	@currentUser nvarchar(2)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TransactionKey]
      ,[MemberKey]
      ,[Amount]
	  ,[Interest]
	  ,[Term]
	  ,[StartDueDate]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ModifiedBy]
      ,[ModifiedDate]
      ,[ApprovalID]
      ,[LastApprovedBy] As [ApprovedBy]
      ,[LastApprovedDate] AS [ApprovedDate]
      ,[LastIsApproved] AS [IsApproved]
      ,[Comment] FROM [LoanApprovalByCurrentUser](@currentUser) AS TA
	WHERE TransactionKey = @loanID
END
GO


