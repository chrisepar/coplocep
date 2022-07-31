USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[GetUserRole]    Script Date: 27/06/2021 2:07:04 pm ******/
DROP FUNCTION [dbo].[GetUserRole]
GO

/****** Object:  UserDefinedFunction [dbo].[GetUserRole]    Script Date: 27/06/2021 2:07:04 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 27, 2021
-- Description:	User Role Description
-- =============================================
CREATE FUNCTION [dbo].[GetUserRole] 
(
	-- Add the parameters for the function here
	@Code nvarchar(2)
)
RETURNS nvarchar(50)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @Result nvarchar(50)

	-- Add the T-SQL statements to compute the return value here
	SELECT @Result = (SELECT [Name] FROM UserRoles WHERE Code = @Code)
	
	-- Return the result of the function
	RETURN @Result

END
GO


