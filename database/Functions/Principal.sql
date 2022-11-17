USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[Principal]    Script Date: 26/06/2021 4:52:04 pm ******/
DROP FUNCTION [dbo].[Principal]
GO

/****** Object:  UserDefinedFunction [dbo].[Principal]    Script Date: 26/06/2021 4:52:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: November 1, 2022
-- Description:	Return Principal
-- =============================================
CREATE FUNCTION [dbo].[Principal] 
(
	-- Add the parameters for the function here	
	@loanAmount float,
	@payment float,
	@interest float
)
RETURNS float
AS
BEGIN
	RETURN ROUND((@payment - dbo.Interest(@loanAmount, @interest)), 2)
END
GO


