USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetComputedMonthlyLoan]    Script Date: 17/07/2021 4:23:14 pm ******/
DROP PROCEDURE [dbo].[GetComputedMonthlyLoan]
GO

/****** Object:  StoredProcedure [dbo].[GetComputedMonthlyLoan]    Script Date: 17/07/2021 4:23:14 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: July 17, 2021
-- Description:	Compute Monthly Loan Payments
-- =============================================
CREATE PROCEDURE [dbo].[GetComputedMonthlyLoan] 
	-- Add the parameters for the stored procedure here
	@amount float, 
	@interest float,
	@term int = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

DECLARE @monthlyInterestRate float = ((@interest / 100) / 12 )
DECLARE @monthlyPayment float = @amount / ((POWER((1 + @monthlyInterestRate), @term) - 1) / (@monthlyInterestRate * POWER((1 + @monthlyInterestRate), @term)))
DECLARE @monthlyAmount float = @amount


;WITH CTE_LoanTable(ID, [Balance], [Payment], [Principal], [Interest], [EndingBalance])
	AS
	(
		SELECT ID = 1, @amount, @monthlyPayment, @monthlyPayment - (@amount * @monthlyInterestRate), @amount * @monthlyInterestRate, (@amount-@monthlyPayment)+(@amount * @monthlyInterestRate)
		UNION ALL
		SELECT ID + 1, ([Balance]-[Payment])+[Interest], [Payment], [Payment] - ((([Balance]-[Payment])+[Interest]) * @monthlyInterestRate), (([Balance]-[Payment])+[Interest]) * @monthlyInterestRate, ([EndingBalance]-[Payment])+((([Balance]-[Payment])+[Interest]) * @monthlyInterestRate)
		FROM CTE_LoanTable
		WHERE ID + 1 <= @term
	)
SELECT ID AS [Month], ROUND([Payment],2) AS [Payment], ROUND([Interest],2) AS [Interest], ROUND([Principal],2) AS [Principal], ROUND([EndingBalance],2) AS [Balance] FROM CTE_LoanTable
END
GO


