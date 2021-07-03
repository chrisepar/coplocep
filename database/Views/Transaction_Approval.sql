USE [Coploan]
GO

/****** Object:  View [dbo].[Transaction Approval]    Script Date: 05/06/2021 3:02:59 pm ******/
DROP VIEW [dbo].[Transaction Approval]
GO

/****** Object:  View [dbo].[Transaction Approval]    Script Date: 05/06/2021 3:02:59 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[Transaction Approval] AS
SELECT T.TransactionKey, T.MemberKey, T.Amount, T.Category, 
dbo.GetUserRole(T.CreatedBy) AS [CreatedBy], 
T.CreatedDate, 
dbo.GetUserRole(T.ModifiedBy) AS [ModifiedBy], 
T.ModifiedDate, 
AWE.ApprovalID, 
dbo.GetUserRole(AWE.ApprovedBy) AS ApprovedBy, 
AWE.ApprovedDate, AWE.IsApproved, AWE.Comment FROM Transactions T
	OUTER APPLY (SELECT TOP 1 * FROM TransactionWorkflow AW WHERE AW.RecordID = T.TransactionKey AND AW.Category != 'Membership' ORDER BY AW.ApprovedDate DESC) AS AWE
GO



