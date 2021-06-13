USE [Coploan]
GO

ALTER TABLE [dbo].[Members] DROP CONSTRAINT [DF_Members_TypeOfMembership]
GO

/****** Object:  Table [dbo].[Members]    Script Date: 09/05/2021 3:17:25 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Members]') AND type in (N'U'))
DROP TABLE [dbo].[Members]
GO

/****** Object:  Table [dbo].[Members]    Script Date: 09/05/2021 3:17:25 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Members](
	[MemberKey] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](250) NULL,
	[MiddleName] [nvarchar](250) NULL,
	[LastName] [nvarchar](250) NULL,
	[TinNumber] [nvarchar](12) NULL,
	[BODResolutionNumber] [nvarchar](10) NULL,
	[TypeOfMembership] [nvarchar](50) NOT NULL,
	[SharesSubscribed] [numeric](4, 0) NOT NULL DEFAULT 0,
	[AmountSubscribed] [numeric](18, 2) NOT NULL DEFAULT 0,
	[InitialPaidUp] [numeric](18, 2) NOT NULL DEFAULT 0,
	[Address] [nvarchar](250) NULL,
	[CivilStatus] [nvarchar](50) NULL,
	[Birthdate] [date] NULL,
	[Birthplace] [nvarchar](250) NULL,
	[Occupation] [nvarchar](250) NULL,
	[Salary] [numeric](18, 2) NULL,
	[OtherIncome] [nvarchar](max) NULL,
	[EducationalAttainment] [nvarchar](250) NULL,
	[SpouseName] [nvarchar](250) NULL,
	[Dependencies] [numeric](2, 0) NULL,
	[OtherCooperative] [nvarchar](250) NULL,
	[Trainings] [nvarchar](250) NULL,
	[CreditReferences] [nvarchar](250) NULL,
	[CreatedBy] [nvarchar](250) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [nvarchar](250) NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Members] PRIMARY KEY CLUSTERED 
(
	[MemberKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Members] ADD  CONSTRAINT [DF_Members_TypeOfMembership]  DEFAULT (N'Regular') FOR [TypeOfMembership]
GO


