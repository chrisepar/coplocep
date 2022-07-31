USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[AddDeposit]    Script Date: 23/05/2021 1:04:20 pm ******/
DROP PROCEDURE [dbo].[AddDeposit]
GO

/****** Object:  StoredProcedure [dbo].[AddDeposit]    Script Date: 23/05/2021 1:04:20 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Name
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[AddDeposit]
	@TransactionKey int OUTPUT,
	@MemberKey int,
	@Amount numeric(18,2),
	@CreatedBy nvarchar(250),
	@CreatedDate datetime,
	@ModifiedBy nvarchar(250),
	@ModifiedDate datetime

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	INSERT INTO [dbo].[Deposits]
           ([MemberKey]
           ,[Amount]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     VALUES(@MemberKey,
		@Amount,
		@CreatedBy,
		@CreatedDate,
		@ModifiedBy,
		@ModifiedDate
	 )
	 
	SELECT @TransactionKey = SCOPE_IDENTITY();
	COMMIT TRANSACTION;
END
GO


