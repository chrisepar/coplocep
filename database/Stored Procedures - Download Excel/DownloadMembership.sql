USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[DownloadMembership]    Script Date: 2022/11/18 0:03:55 ******/
DROP PROCEDURE [dbo].[DownloadMembership]
GO

/****** Object:  StoredProcedure [dbo].[DownloadMembership]    Script Date: 2022/11/18 0:03:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Cee
-- Create date: May 23, 2021
-- Description:	Download Membership Details
-- =============================================
CREATE PROCEDURE [dbo].[DownloadMembership] 
	-- Add the parameters for the stored procedure here
	@key int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		FirstName AS [First Name]
	FROM Members
END
GO


