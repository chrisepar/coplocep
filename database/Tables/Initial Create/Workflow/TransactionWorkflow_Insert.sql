USE [Coploan]
GO

ALTER TABLE [dbo].[TransactionWorkflow] DROP CONSTRAINT [DF_TransactionWorkflow_IsApproved]
GO

/****** Object:  Table [dbo].[TransactionWorkflow]    Script Date: 01/06/2021 8:11:18 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TransactionWorkflow]') AND type in (N'U'))
DROP TABLE [dbo].[TransactionWorkflow]
GO

/****** Object:  Table [dbo].[TransactionWorkflow]    Script Date: 01/06/2021 8:11:18 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TransactionWorkflow](
	[ApprovalID] [int] IDENTITY(1,1) NOT NULL,
	[RecordID] [int] NOT NULL,
	[Category] [nvarchar](50) NOT NULL,
	[ApprovedBy] [nvarchar](2) NOT NULL,
	[ApprovedDate] [datetime] NOT NULL,
	[IsApproved] [nvarchar](1) NOT NULL,
	[Comment] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[TransactionWorkflow] ADD  CONSTRAINT [DF_TransactionWorkflow_IsApproved]  DEFAULT (N'N') FOR [IsApproved]
GO


