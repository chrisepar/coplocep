USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[InterestRate]    Script Date: 26/06/2021 4:52:04 pm ******/
DROP FUNCTION [dbo].[InterestRate]
GO

/****** Object:  UserDefinedFunction [dbo].[InterestRate]    Script Date: 26/06/2021 4:52:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: November 1, 2022
-- Description:	Return Interate Rate
-- =============================================
CREATE FUNCTION [dbo].[InterestRate] 
(
	-- Add the parameters for the function here
	@interest float
)
RETURNS float
AS
BEGIN
	RETURN ((@interest / 100) / 12 )
END
GO


