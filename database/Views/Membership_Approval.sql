USE [Coploan]
GO

/****** Object:  View [dbo].[Membership Approval]    Script Date: 05/06/2021 3:02:59 pm ******/
DROP VIEW [dbo].[Membership Approval]
GO

/****** Object:  View [dbo].[Membership Approval]    Script Date: 05/06/2021 3:02:59 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Membership Approval] AS
SELECT M.MemberKey, M.FirstName, M.MiddleName, M.LastName, M.TinNumber, M.BODResolutionNumber, M.TypeOfMembership, M.SharesSubscribed, M.AmountSubscribed,
M.InitialPaidUp, M.Address, M.CivilStatus, M.Birthdate, M.Birthplace, M.Occupation, M.Salary, M.OtherIncome, M.EducationalAttainment, M.SpouseName, M.Dependencies,
M.OtherCooperative, M.Trainings, M.CreditReferences,
(SELECT [Name] FROM UserRoles WHERE Code = M.CreatedBy) AS [CreatedBy],
M.CreatedDate,
(SELECT [Name] FROM UserRoles WHERE Code = M.ModifiedBy) AS [ModifiedBy], 
M.ModifiedDate,
AWE.ApprovalID, 
(SELECT [Name] FROM UserRoles WHERE Code = AWE.ApprovedBy) AS ApprovedBy, 
AWE.ApprovedDate, AWE.IsApproved, AWE.Comment FROM Members M
	OUTER APPLY (SELECT TOP 1 * FROM ApprovalWorkflow AW WHERE AW.RecordID = M.MemberKey AND AW.Category = 'Membership' ORDER BY AW.ApprovedDate DESC) AS AWE
GO



	