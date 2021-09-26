USE [Coploan]
GO

ALTER TABLE [dbo].[Loans] DROP CONSTRAINT [FK_Loan_Members]
GO


/****** Object:  Table [dbo].[Loans]    Script Date: 09/05/2021 3:18:08 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Loans]') AND type in (N'U'))
DROP TABLE [dbo].[Loans]
GO

/****** Object:  Table [dbo].[Loans]    Script Date: 09/05/2021 3:18:08 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Loans](
	[TransactionKey] [int] IDENTITY(1,1) NOT NULL,
	[MemberKey] [int] NULL,
	[Amount] [numeric](18, 2) NULL,
	[Interest] [numeric](18, 2) NULL,
	[Term] [int] NULL,
	[CreatedBy] [nvarchar](255) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [nvarchar](255) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Loan] PRIMARY KEY CLUSTERED 
(
	[TransactionKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[Loans]  WITH CHECK ADD  CONSTRAINT [FK_Loan_Members] FOREIGN KEY([MemberKey])
REFERENCES [dbo].[Members] ([MemberKey])
GO

ALTER TABLE [dbo].[Loans] CHECK CONSTRAINT [FK_Loan_Members]
GO


