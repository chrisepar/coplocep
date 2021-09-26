USE [Coploan]
GO

/****** Object:  Table [dbo].[Interests]    Script Date: 09/05/2021 3:18:08 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Interests]') AND type in (N'U'))
DROP TABLE [dbo].[Interests]
GO

/****** Object:  Table [dbo].[Interests]    Script Date: 09/05/2021 3:18:08 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Interests](
	[TransactionKey] [int] IDENTITY(1,1) NOT NULL,
	[MemberKey] [int] NOT NULL,
	[LoanKey] [int] NOT NULL,
	[Amount] [numeric](18, 2) NULL,
	[CreatedBy] [nvarchar](255) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [nvarchar](255) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Interests] PRIMARY KEY CLUSTERED 
(
	[TransactionKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Interests]  WITH CHECK ADD  CONSTRAINT [FK_Interests_Members] FOREIGN KEY([MemberKey])
REFERENCES [dbo].[Members] ([MemberKey])
GO

ALTER TABLE [dbo].[Interests]  WITH CHECK ADD  CONSTRAINT [FK_Interests_Loans] FOREIGN KEY([LoanKey])
REFERENCES [dbo].[Loans] ([TransactionKey])
GO

ALTER TABLE [dbo].[Interests] CHECK CONSTRAINT [FK_Interests_Members]
GO

ALTER TABLE [dbo].[Interests] CHECK CONSTRAINT [FK_Interests_Loans]
GO


