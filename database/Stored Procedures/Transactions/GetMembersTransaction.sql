USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMembersTransaction]    Script Date: 23/05/2021 12:50:40 pm ******/
DROP PROCEDURE [dbo].[GetMembersTransaction]
GO

/****** Object:  StoredProcedure [dbo].[GetMembersTransaction]    Script Date: 23/05/2021 12:50:40 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 05, 2021
-- Description:	Get Members Transactions
-- =============================================
CREATE PROCEDURE [dbo].[GetMembersTransaction] 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [MemberKey],
                        [Name],
                        CONVERT(DECIMAL(18,2),[Loan]) AS [LoanAmount],
                        CONVERT(DECIMAL(18,2),[Deposit]) AS [DepositAmount],
                        CONVERT(DECIMAL(18,2),[Interest]) AS [InterestPaidAmount],
                        CONVERT(DECIMAL(18,2),[Share]) AS [AverageShareAmount]
                        FROM
                        (
	                        SELECT M.MemberKey AS [MemberKey],
	                        LastName + ', ' + FirstName + ' ' + MiddleName AS [Name], 
	                        [Category], [Amount] FROM Transactions T
	                        RIGHT JOIN [Membership Approval] M ON M.MemberKey = T.MemberKey
							WHERE M.IsFinalApproved = 'Y'
                        ) AS SourceTable PIVOT(SUM([Amount]) FOR [Category] IN (
                        [Loan], 
                        [Deposit], 
                        [Interest], 
                        [Share])) AS PivotTable
END
GO


