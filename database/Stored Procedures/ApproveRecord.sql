USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[ApproveRecord]    Script Date: 05/06/2021 3:42:14 pm ******/
DROP PROCEDURE [dbo].[ApproveRecord]
GO

/****** Object:  StoredProcedure [dbo].[ApproveRecord]    Script Date: 05/06/2021 3:42:14 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 6, 2021
-- Description:	Approve Record
-- =============================================
CREATE PROCEDURE [dbo].[ApproveRecord] 
	-- Add the parameters for the stored procedure here
	@RecordID int,
	@Category nvarchar(50),
	@ApprovedBy nvarchar(2),
	@ApprovedDate datetime,
	@Comment nvarchar(max) = ''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[ApprovalWorkflow]
           ([RecordID]
		   ,[Category]
           ,[ApprovedBy]
           ,[ApprovedDate]
           ,[IsApproved]
           ,[Comment])
     VALUES
           (@RecordID
           ,@Category
           ,@ApprovedBy
           ,@ApprovedDate
           ,'Y'
           ,@Comment)

	COMMIT TRANSACTION;
END
GO


