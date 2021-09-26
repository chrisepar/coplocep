USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[DeleteLoan]    Script Date: 29/05/2021 3:19:22 pm ******/
DROP PROCEDURE [dbo].[DeleteLoan]
GO

/****** Object:  StoredProcedure [dbo].[DeleteLoan]    Script Date: 29/05/2021 3:19:22 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 29, 2021
-- Description:	Delete Single Loan
-- =============================================
CREATE PROCEDURE [dbo].[DeleteLoan] 
	-- Add the parameters for the stored procedure here
	@LoanKey int = null,
	@currentUser nvarchar(2)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	DELETE FROM Loans WHERE LoanKey = @LoanKey AND (SELECT IsLastApprovedByCurrentUser FROM [LoanApprovalByCurrentUser](@currentUser) WHERE  LoanKey = @LoanKey) = 'Y'
	SELECT @@ROWCOUNT
	COMMIT TRANSACTION;
END
GO