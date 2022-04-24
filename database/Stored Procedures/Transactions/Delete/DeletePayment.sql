USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[DeletePayment]    Script Date: 06/02/2022 4:21:36 pm ******/
DROP PROCEDURE [dbo].[DeletePayment]
GO

/****** Object:  StoredProcedure [dbo].[DeletePayment]    Script Date: 06/02/2022 4:21:36 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: February 06, 2022
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[DeletePayment] 
	-- Add the parameters for the stored procedure here
	@PaymentKey int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	DELETE FROM Payments WHERE TransactionKey = @PaymentKey
	SELECT @@ROWCOUNT
	COMMIT TRANSACTION;
END
GO


