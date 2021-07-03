USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetUserRoles]    Script Date: 30/05/2021 3:30:21 pm ******/
DROP PROCEDURE [dbo].[GetUserRoles]
GO

/****** Object:  StoredProcedure [dbo].[GetUserRoles]    Script Date: 30/05/2021 3:30:21 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 30, 2021
-- Description:	Get User Roles
-- =============================================
CREATE PROCEDURE [dbo].[GetUserRoles] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM UserRoles
END
GO


