USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[SaveSettings]    Script Date: 03/07/2021 3:01:35 pm ******/
DROP PROCEDURE [dbo].[SaveSettings]
GO

/****** Object:  StoredProcedure [dbo].[SaveSettings]    Script Date: 03/07/2021 3:01:35 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: July 03, 2021
-- Description:	Save Settings
-- =============================================
CREATE PROCEDURE [dbo].[SaveSettings] 
	-- Add the parameters for the stored procedure here
	@interest int = 1, 
	@term int = 12
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE Settings SET Interest = @interest, Term = @term
END
GO


