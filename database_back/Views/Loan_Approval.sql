USE [Coploan]
GO

/****** Object:  View [dbo].[Loan Approval]    Script Date: 05/06/2021 3:02:59 pm ******/
DROP VIEW [dbo].[Loan Approval]
GO

/****** Object:  View [dbo].[Loan Approval]    Script Date: 05/06/2021 3:02:59 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Loan Approval] AS
SELECT T.TransactionKey, T.MemberKey, T.Amount, T.Interest, T.Term,
dbo.GetUserRole(T.CreatedBy) AS [CreatedBy], 
T.CreatedDate, 
dbo.GetUserRole(T.ModifiedBy) AS [ModifiedBy], 
T.ModifiedDate, 
AWE.ApprovalID, 
dbo.GetUserRole(AWE.ApprovedBy) AS ApprovedBy, 
AWE.ApprovedDate, AWE.IsApproved, AWE.Comment FROM Loans T
	OUTER APPLY (SELECT TOP 1 * FROM TransactionWorkflow AW WHERE AW.RecordID = T.TransactionKey ORDER BY AW.ApprovedDate DESC) AS AWE
GO

