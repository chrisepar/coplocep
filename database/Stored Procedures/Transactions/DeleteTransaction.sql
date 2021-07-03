USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[DeleteTransaction]    Script Date: 29/05/2021 3:19:22 pm ******/
DROP PROCEDURE [dbo].[DeleteTransaction]
GO

/****** Object:  StoredProcedure [dbo].[DeleteTransaction]    Script Date: 29/05/2021 3:19:22 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 29, 2021
-- Description:	Delete Single Transaction
-- =============================================
CREATE PROCEDURE [dbo].[DeleteTransaction] 
	-- Add the parameters for the stored procedure here
	@TransactionKey int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	DELETE FROM Transactions WHERE TransactionKey = @TransactionKey AND (SELECT IsApproved FROM [Transaction Approval] WHERE  TransactionKey = @TransactionKey) IS NULL
	SELECT @@ROWCOUNT
	COMMIT TRANSACTION;
END
GO
