USE [Coploan]
GO

/****** Object:  Table [dbo].[Deposits]    Script Date: 09/05/2021 3:18:08 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Deposits]') AND type in (N'U'))
DROP TABLE [dbo].[Deposits]
GO

/****** Object:  Table [dbo].[Deposits]    Script Date: 09/05/2021 3:18:08 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Deposits](
	[TransactionKey] [int] IDENTITY(1,1) NOT NULL,
	[MemberKey] [int] NOT NULL,
	--[LoanKey] [int] NOT NULL,
	[Amount] [numeric](18, 2) NULL,
	[CreatedBy] [nvarchar](255) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [nvarchar](255) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Deposits] PRIMARY KEY CLUSTERED 
(
	[TransactionKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Deposits]  WITH CHECK ADD  CONSTRAINT [FK_Deposits_Members] FOREIGN KEY([MemberKey])
REFERENCES [dbo].[Members] ([MemberKey])
GO

--ALTER TABLE [dbo].[Deposits]  WITH CHECK ADD  CONSTRAINT [FK_Deposits_Loans] FOREIGN KEY([LoanKey])
--REFERENCES [dbo].[Loans] ([LoanKey])
--GO

ALTER TABLE [dbo].[Deposits] CHECK CONSTRAINT [FK_Deposits_Members]
GO

--ALTER TABLE [dbo].[Deposits] CHECK CONSTRAINT [FK_Deposits_Loans]
--GO



