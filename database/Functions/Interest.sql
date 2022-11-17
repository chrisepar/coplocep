USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[Interest]    Script Date: 26/06/2021 4:52:04 pm ******/
DROP FUNCTION [dbo].[Interest]
GO

/****** Object:  UserDefinedFunction [dbo].[Interest]    Script Date: 26/06/2021 4:52:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: November 1, 2022
-- Description:	Return Interate
-- =============================================
CREATE FUNCTION [dbo].[Interest] 
(
	-- Add the parameters for the function here
	@loanAmount float,
	@interest float
)
RETURNS float
AS
BEGIN
	RETURN ROUND((@loanAmount * dbo.InterestRate(@interest)), 2)
END
GO


