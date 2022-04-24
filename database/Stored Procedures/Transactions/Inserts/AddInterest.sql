USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[AddInterest]    Script Date: 23/05/2021 1:04:20 pm ******/
DROP PROCEDURE [dbo].[AddInterest]
GO

/****** Object:  StoredProcedure [dbo].[AddInterest]    Script Date: 23/05/2021 1:04:20 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Name
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[AddInterest]
	@MemberKey int,
	@LoanKey int,
	@Interest numeric(3,2) = NULL,
	@Term numeric(2,0) = NULL,
	@Amount float,
	@CreatedBy nvarchar(250),
	@CreatedDate datetime,
	@ModifiedBy nvarchar(250),
	@ModifiedDate datetime

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	DECLARE @StaticInterest float = @Amount * @Interest

	INSERT INTO [dbo].[Interests]
           ([MemberKey]
		   ,[LoanKey]
           ,[Amount]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     VALUES(@MemberKey,
		@LoanKey,
		(@StaticInterest * (@Term /12 )),
		@CreatedBy,
		@CreatedDate,
		@ModifiedBy,
		@ModifiedDate
	 )
END
GO


