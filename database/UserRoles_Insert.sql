USE [Coploan]
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 30/05/2021 3:27:33 pm ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[UserRoles]') AND type in (N'U'))
DROP TABLE [dbo].[UserRoles]
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 30/05/2021 3:27:33 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[Code] [nvarchar](2) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
INSERT [dbo].[UserRoles] ([Code], [Name]) VALUES (N'CA', N'Cashier')
GO
INSERT [dbo].[UserRoles] ([Code], [Name]) VALUES (N'AD', N'Administrator')
GO
INSERT [dbo].[UserRoles] ([Code], [Name]) VALUES (N'BK', N'Book Keeper')
GO
INSERT [dbo].[UserRoles] ([Code], [Name]) VALUES (N'A1', N'Approving Manager #1')
GO
INSERT [dbo].[UserRoles] ([Code], [Name]) VALUES (N'A2', N'Approving Manager #2')
GO
INSERT [dbo].[UserRoles] ([Code], [Name]) VALUES (N'DR', N'Director')
GO
