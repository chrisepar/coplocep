USE [Coploan]
GO

ALTER TABLE [dbo].[Settings] DROP CONSTRAINT [DF_Settings_Interest]
GO

/****** Object:  Table [dbo].[Settings]    Script Date: 03/07/2021 2:42:01 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Settings]') AND type in (N'U'))
DROP TABLE [dbo].[Settings]
GO

/****** Object:  Table [dbo].[Settings]    Script Date: 03/07/2021 2:42:01 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Settings](
	[Interest] [int] NOT NULL,
	[Term] [int] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Settings] ADD  CONSTRAINT [DF_Settings_Interest]  DEFAULT ((1)) FOR [Interest]
GO


ALTER TABLE [dbo].[Settings] ADD  CONSTRAINT [DF_Settings_Term]  DEFAULT ((12)) FOR [Term]
GO

INSERT INTO Settings(Interest, Term) VALUES(1, 12)
GO