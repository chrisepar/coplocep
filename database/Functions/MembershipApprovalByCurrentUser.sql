USE [Coploan]
GO

/****** Object:  UserDefinedFunction [dbo].[MembershipApprovalByCurrentUser]    Script Date: 20/06/2021 3:50:53 pm ******/
DROP FUNCTION [dbo].[MembershipApprovalByCurrentUser]
GO

/****** Object:  UserDefinedFunction [dbo].[MembershipApprovalByCurrentUser]    Script Date: 20/06/2021 3:50:53 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: June 20, 2021
-- Description:	Membership Approval By User
-- =============================================
CREATE FUNCTION [dbo].[MembershipApprovalByCurrentUser] 
(
	@currentUser nvarchar(2)	 
)
RETURNS TABLE 
AS 
RETURN 

SELECT M.MemberKey, M.LastName + ', ' + M.FirstName + ' ' + M.MiddleName AS [Name], 
M.FirstName, M.MiddleName, M.LastName, M.TinNumber, M.BODResolutionNumber, M.TypeOfMembership, M.SharesSubscribed, M.AmountSubscribed,
M.InitialPaidUp, M.Address, M.CivilStatus, M.Birthdate, M.Birthplace, M.Occupation, M.Salary, M.OtherIncome, M.EducationalAttainment, M.SpouseName, M.Dependencies,
M.OtherCooperative, M.Trainings, M.CreditReferences,
(SELECT [Name] FROM UserRoles WHERE Code = M.CreatedBy) AS [CreatedBy],
M.CreatedDate,
(SELECT [Name] FROM UserRoles WHERE Code = M.ModifiedBy) AS [ModifiedBy], 
M.ModifiedDate,
(SELECT [Name] FROM UserRoles WHERE Code = AWE.ApprovedBy) AS [LastApprovedBy], 
AWE.ApprovedDate AS [LastApprovedDate], 
AWE.IsApproved AS [LastIsApproved],
AWE.Comment,
AWEC.IsApproved AS [IsApprovedByCurrent],
dbo.IsFinalApproved(M.MemberKey, 'Membership') AS [IsFinalApproved]
FROM Members M
	OUTER APPLY (SELECT TOP 1 * FROM MembershipWorkflow AW WHERE AW.RecordID = M.MemberKey AND AW.Category = 'Membership' ORDER BY AW.ApprovedDate DESC) AS AWE
	OUTER APPLY (SELECT TOP 1 * FROM MembershipWorkflow AWC WHERE AWC.RecordID = M.MemberKey AND AWC.Category = 'Membership' AND AWC.ApprovedBy = @currentUser ORDER BY AWC.ApprovedDate DESC) AS AWEC

GO


