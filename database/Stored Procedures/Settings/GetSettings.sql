USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetSettings]    Script Date: 03/07/2021 2:59:46 pm ******/
DROP PROCEDURE [dbo].[GetSettings]
GO

/****** Object:  StoredProcedure [dbo].[GetSettings]    Script Date: 03/07/2021 2:59:46 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: July 3, 2021
-- Description:	Get Settings
-- =============================================
CREATE PROCEDURE [dbo].[GetSettings] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Interest, Term FROM Settings
END
GO


