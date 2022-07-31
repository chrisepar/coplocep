USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[GetMembershipTimeline]    Script Date: 27/06/2021 2:17:20 pm ******/
DROP PROCEDURE [dbo].[GetMembershipTimeline]
GO

/****** Object:  StoredProcedure [dbo].[GetMembershipTimeline]    Script Date: 27/06/2021 2:17:20 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 27, 2021
-- Description:	Get Membership Timeline
-- =============================================
CREATE PROCEDURE [dbo].[GetMembershipTimeline] 
	-- Add the parameters for the stored procedure here
	@RecordID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT AW.ApprovalID, AW.RecordID, AW.Category, dbo.GetUserRole(AW.ApprovedBy) AS [ApprovedBy], 
AW.ApprovedDate, AW.IsApproved, AW.Comment FROM MembershipWorkflow AW
WHERE AW.RecordID = @RecordID

END
GO


