USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[AddLoan]    Script Date: 23/05/2021 1:04:20 pm ******/
DROP PROCEDURE [dbo].[AddLoan]
GO

/****** Object:  StoredProcedure [dbo].[AddLoan]    Script Date: 23/05/2021 1:04:20 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Name
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[AddLoan]
	@TransactionKey int OUTPUT,
	@MemberKey int,
	@Amount numeric(18,2),
	@Interest numeric(3,2) = NULL,
	@Term numeric(2,0) = NULL,
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
	INSERT INTO [dbo].[Loans]
           ([MemberKey]
           ,[Amount]
		   ,[Interest]
		   ,[Term]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     VALUES(@MemberKey,
		@Amount,
		@Interest,
		@Term,
		@CreatedBy,
		@CreatedDate,
		@ModifiedBy,
		@ModifiedDate
	 )
	 
	SELECT @TransactionKey = SCOPE_IDENTITY();

	EXEC [AddInterest] @MemberKey, @TransactionKey, @Interest, @Term, @Amount, @CreatedBy, @CreatedDate, @ModifiedBy, @ModifiedDate

	COMMIT TRANSACTION;
END
GO


