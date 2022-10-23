USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[DeleteMembership]    Script Date: 29/05/2021 3:19:22 pm ******/
DROP PROCEDURE [dbo].[DeleteMembership]
GO

/****** Object:  StoredProcedure [dbo].[DeleteMembership]    Script Date: 29/05/2021 3:19:22 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 29, 2021
-- Description:	Delete single member
-- =============================================
CREATE PROCEDURE [dbo].[DeleteMembership] 
	-- Add the parameters for the stored procedure here
	@MemberKey int = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	DELETE FROM Loans WHERE MemberKey = @MemberKey
	DELETE FROM Deposits WHERE MemberKey = @MemberKey
	DELETE FROM Payments WHERE MemberKey = @MemberKey
	DELETE FROM Interests WHERE MemberKey = @MemberKey
	DELETE FROM TransactionWorkflow WHERE RecordID = @MemberKey
	DELETE FROM MembershipWorkflow WHERE RecordID = @MemberKey
	DELETE FROM Members WHERE MemberKey = @MemberKey
	SELECT @@ROWCOUNT
	COMMIT TRANSACTION;
END
GO