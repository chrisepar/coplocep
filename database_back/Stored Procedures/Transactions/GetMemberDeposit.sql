USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberDeposit]    Script Date: 24/05/2021 9:37:48 pm ******/
DROP PROCEDURE [dbo].[GetMemberDeposit]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberDeposit]    Script Date: 24/05/2021 9:37:48 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 24, 2021
-- Description:	Get Member Deposit
-- =============================================
CREATE PROCEDURE [dbo].[GetMemberDeposit] 
	-- Add the parameters for the stored procedure here
	@memberKey int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TransactionKey]
      ,[MemberKey]
      ,[Amount]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ModifiedBy]
      ,[ModifiedDate]
	  FROM Deposits
	  WHERE MemberKey = @memberKey
END
GO


