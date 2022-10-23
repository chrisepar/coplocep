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
	SELECT [TransactionKey]
      ,[MemberKey]
      ,[Amount]
	  ,[Interest]
	  ,[Term]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ModifiedBy]
      ,[ModifiedDate]
      ,[ApprovalID]
      ,[LastApprovedBy] As [ApprovedBy]
      ,[LastApprovedDate] AS [ApprovedDate]
      ,[LastIsApproved] AS [IsApproved]
      ,[Comment] FROM [LoanApprovalByCurrentUser](@currentUser) AS TA
	WHERE MemberKey = @memberKey
END
GO