USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[DeleteDeposit]    Script Date: 29/05/2021 3:19:22 pm ******/
DROP PROCEDURE [dbo].[DeleteDeposit]
GO

/****** Object:  StoredProcedure [dbo].[DeleteDeposit]    Script Date: 29/05/2021 3:19:22 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 29, 2021
-- Description:	Delete Single Deposit
-- =============================================
CREATE PROCEDURE [dbo].[DeleteDeposit] 
	-- Add the parameters for the stored procedure here
	@DepositKey int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	DELETE FROM Deposits WHERE TransactionKey = @DepositKey
	SELECT @@ROWCOUNT
	COMMIT TRANSACTION;
END
GO