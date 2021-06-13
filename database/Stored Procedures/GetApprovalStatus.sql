USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetApprovalStatus]    Script Date: 01/06/2021 8:15:48 pm ******/
DROP PROCEDURE [dbo].[GetApprovalStatus]
GO

/****** Object:  StoredProcedure [dbo].[GetApprovalStatus]    Script Date: 01/06/2021 8:15:48 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 1, 2021
-- Description:	Get Approval Status for a Record and Category
-- =============================================
CREATE PROCEDURE [dbo].[GetApprovalStatus] 
	-- Add the parameters for the stored procedure here
	@RecordID int, 
	@Category nvarchar(50) 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM ApprovalWorkflow WHERE RecordID = @RecordID
END
GO


