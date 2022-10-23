USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetTypeOfLoans]    Script Date: 30/05/2021 3:30:21 pm ******/
DROP PROCEDURE [dbo].[GetTypeOfLoans]
GO

/****** Object:  StoredProcedure [dbo].[GetTypeOfLoans]    Script Date: 30/05/2021 3:30:21 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 30, 2021
-- Description:	Get Type of loans
-- =============================================
CREATE PROCEDURE [dbo].[GetTypeOfLoans] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM TypeOfLoans
END
GO


