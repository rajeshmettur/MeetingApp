USE [Meeting]
GO

/****** Object:  Table [dbo].[OrderItems]    Script Date: 2/11/2020 7:20:43 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Attendees]') AND type in (N'U'))
DROP TABLE [dbo].Attendees
GO
/****** Object:  Table [dbo].[Order]    Script Date: 2/11/2020 7:20:43 PM   ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Meetings]') AND type in (N'U'))
DROP TABLE [dbo].Meetings
GO
/****** Object:  Table [dbo].[Item]    Script Date: 2/11/2020 7:20:43 PM   ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
DROP TABLE [dbo].Users
GO

/****** Object:  Table [dbo].[Attendees]   Script Date: 2/11/2020 7:20:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Attendees](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AttendeeName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Attendees] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

USE [Meeting]
GO

/****** Object:  Table [dbo].[Meetings]    Script Date: 2/11/2020 7:24:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Meetings](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Subject] [nvarchar](max) NULL,
	[Agenda] [nvarchar](max) NULL,
	[MeetingTime] [datetime2](7) NOT NULL,
	[AttendeeId] [int] NULL,
 CONSTRAINT [PK_Meetings] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Meetings]  WITH CHECK ADD  CONSTRAINT [FK_Meetings_Attendees_AttendeeId] FOREIGN KEY([AttendeeId])
REFERENCES [dbo].[Attendees] ([Id])
GO

ALTER TABLE [dbo].[Meetings] CHECK CONSTRAINT [FK_Meetings_Attendees_AttendeeId]
GO


USE [Meeting]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 2/11/2020 7:24:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](max) NULL,
	[PasswordHash] [varbinary](max) NULL,
	[PasswordSalt] [varbinary](max) NULL,
	[Gender] [nvarchar](max) NULL,
	[DateOfBirth] [datetime2](7) NOT NULL,
	[City] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[Created] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


