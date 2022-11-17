USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[ForcastMonthlyPayment]    Script Date: 26/06/2021 4:52:04 pm ******/
DROP FUNCTION [dbo].[ForcastMonthlyPayment]
GO

/****** Object:  UserDefinedFunction [dbo].[ForcastMonthlyPayment]    Script Date: 26/06/2021 4:52:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: November 1, 2022
-- Description:	Return forecasted monthly payment
-- =============================================
CREATE FUNCTION [dbo].[ForcastMonthlyPayment] 
(
	-- Add the parameters for the function here
	@amount float,
	@interest float,
	@term int
)
RETURNS float
AS
BEGIN
	DECLARE @interestRate float = dbo.InterestRate(@interest)
	RETURN ROUND(@amount / ((POWER((1 + @interestRate), @term) - 1) / (@interestRate * POWER((1 + @interestRate), @term))), 2)
END
GO


