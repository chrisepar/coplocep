USE [Coploan]
GO

ALTER TABLE [dbo].[Transactions] DROP CONSTRAINT [FK_Transactions_Members]
GO

ALTER TABLE [dbo].[Transactions] DROP CONSTRAINT [DF_Transactions_Category]
GO

/****** Object:  Table [dbo].[Transactions]    Script Date: 09/05/2021 3:18:08 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Transactions]') AND type in (N'U'))
DROP TABLE [dbo].[Transactions]
GO

/****** Object:  Table [dbo].[Transactions]    Script Date: 09/05/2021 3:18:08 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Transactions](
	[TransactionKey] [int] IDENTITY(1,1) NOT NULL,
	[MemberKey] [int] NULL,
	[Amount] [numeric](18, 2) NULL,
	[Category] [nvarchar](50) NULL,
	[CreatedBy] [nvarchar](255) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [nvarchar](255) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[TransactionKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Transactions] ADD  CONSTRAINT [DF_Transactions_Category]  DEFAULT (N'Loan') FOR [Category]
GO

ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_Members] FOREIGN KEY([MemberKey])
REFERENCES [dbo].[Members] ([MemberKey])
GO

ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_Members]
GO


