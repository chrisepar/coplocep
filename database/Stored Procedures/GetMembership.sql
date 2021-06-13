USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberhip]    Script Date: 23/05/2021 11:15:17 am ******/
DROP PROCEDURE [dbo].[GetMemberhip]
GO

/****** Object:  StoredProcedure [dbo].[GetMemberhip]    Script Date: 23/05/2021 11:15:17 am ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 23, 2021
-- Description:	Get Members List or Member
-- =============================================
CREATE PROCEDURE [dbo].[GetMemberhip] 
	-- Add the parameters for the stored procedure here
	@memberKey nvarchar(255) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT *,  LastName + ', ' + FirstName + ' ' + MiddleName AS [Name] FROM [Membership Approval] 
	WHERE  (MemberKey = @memberKey OR @memberKey IS NULL) 
END
GO


