USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[AddTransaction]    Script Date: 23/05/2021 1:04:20 pm ******/
DROP PROCEDURE [dbo].[AddTransaction]
GO

/****** Object:  StoredProcedure [dbo].[AddTransaction]    Script Date: 23/05/2021 1:04:20 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Name
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[AddTransaction]
	@TransactionKey int OUTPUT,
	@MemberKey int,
	@Amount numeric(18,2),
	@Interest numeric(3,2) = NULL,
	@Term numeric(2,0) = NULL,
	@Category nvarchar(50),
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
	INSERT INTO [dbo].[Transactions]
           ([MemberKey]
           ,[Amount]
		   ,[Interest]
		   ,[Term]
           ,[Category]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     VALUES(@MemberKey,
		@Amount,
		@Interest,
		@Term,
		@Category,
		@CreatedBy,
		@CreatedDate,
		@ModifiedBy,
		@ModifiedDate
	 )
	 
	SELECT @TransactionKey = SCOPE_IDENTITY();
	COMMIT TRANSACTION;
END
GO


