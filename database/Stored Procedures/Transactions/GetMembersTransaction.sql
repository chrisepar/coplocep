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
		SELECT MA.MemberKey, MA.MemberID, LastName + ', ' + FirstName + ' ' + MiddleName AS [Name], 
				SUM(L.Amount) AS [LoanAmount], SUM(I.Amount) AS [InterestPaidAmount], SUM(D.Amount) AS [DepositAmount] FROM [Membership Approval] MA
		LEFT JOIN Loans L ON L.MemberKey = MA.MemberKey
		LEFT JOIN Interests I ON I.MemberKey = MA.MemberKey
		LEFT JOIN Deposits D ON D.MemberKey = MA.MemberKey
		WHERE MA.IsFinalApproved = 'Y'
		GROUP BY MA.MemberKey, MA.MemberID, LastName, FirstName, MiddleName
END
GO