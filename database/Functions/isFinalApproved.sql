USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[IsFinalApproved]    Script Date: 26/06/2021 4:52:04 pm ******/
DROP FUNCTION [dbo].[IsFinalApproved]
GO

/****** Object:  UserDefinedFunction [dbo].[IsFinalApproved]    Script Date: 26/06/2021 4:52:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 26, 2021
-- Description:	Return status
-- =============================================
CREATE FUNCTION [dbo].[IsFinalApproved] 
(
	-- Add the parameters for the function here
	@RecordID int,
	@Category nvarchar(50)
)
RETURNS nvarchar(1)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @Result NVARCHAR(1)
	DECLARE @ApprovedCount INT
	DECLARE @MaxApprovalCount INT = 1

	SET @ApprovedCount = IIF(@Category = 'Membership',
	(SELECT COUNT(*) FROM MembershipWorkflow WHERE RecordID = @RecordID AND Category = @Category AND IsApproved = 'Y'),
	(SELECT COUNT(*) FROM TransactionWorkflow WHERE RecordID = @RecordID AND Category = @Category AND IsApproved = 'Y'))
	
	SELECT @Result = IIF(@ApprovedCount >= @MaxApprovalCount, 'Y', 'N')

	-- Return the result of the function
	RETURN @Result

END
GO


