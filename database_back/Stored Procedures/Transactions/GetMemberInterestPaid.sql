USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberInterestPaid]    Script Date: 24/05/2021 9:38:31 pm ******/
DROP PROCEDURE [dbo].[GetMemberInterestPaid]
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
CREATE PROCEDURE [dbo].[GetMemberInterestPaid] 
	-- Add the parameters for the stored procedure here
	@memberKey int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	SELECT [LoanKey] AS [TransactionKey]
      ,[MemberKey]
      ,[Amount]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ModifiedBy]
      ,[ModifiedDate]
	  FROM Interests
	  WHERE MemberKey = @memberKey
END
GO


