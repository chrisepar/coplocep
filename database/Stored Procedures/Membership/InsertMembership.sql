USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[InsertMembership]    Script Date: 23/05/2021 12:23:27 pm ******/
DROP PROCEDURE [dbo].[InsertMembership]
GO

/****** Object:  StoredProcedure [dbo].[InsertMembership]    Script Date: 23/05/2021 12:23:27 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 05, 2021
-- Description:	Insert Member
-- =============================================
CREATE PROCEDURE [dbo].[InsertMembership] 
	-- Add the parameters for the stored procedure here
	@MemberKey int OUTPUT,
	@MemberID nvarchar(250),
	@FirstName nvarchar(250),
	@MiddleName nvarchar(250),
	@LastName nvarchar(250),
	@TinNumber nvarchar(12),
	@BODResolutionNumber nvarchar(10),
	@TypeOfMembership nvarchar(50),
	@SharesSubscribed numeric(4,0),
	@AmountSubscribed numeric(18,2),
	@InitialPaidUp numeric(18,2),
	@Address nvarchar(250),
	@CivilStatus nvarchar(50),
	@Birthdate date,
	@Birthplace nvarchar(250),
	@Occupation nvarchar(250),
	@Salary numeric(18,2),
	@OtherIncome nvarchar(max),
	@EducationalAttainment nvarchar(250),
	@SpouseName nvarchar(250),
	@Dependencies numeric(2,0),
	@OtherCooperative nvarchar(250),
	@Trainings nvarchar(250),
	@CreditReferences nvarchar(250),
	@CreatedBy nvarchar(250),
	@CreatedDate datetime,
	@ModifiedBy nvarchar(250),
	@ModifiedDate datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT OFF;
	BEGIN TRANSACTION;
    -- Insert statements for procedure here
	INSERT INTO [dbo].[Members]
	([MemberID], [FirstName] ,[MiddleName] ,[LastName] ,[TinNumber] ,[Address] ,[CivilStatus] ,[Birthdate] ,[Birthplace] ,[Occupation] ,[Salary] ,[OtherIncome]
                       ,[EducationalAttainment] ,[SpouseName] ,[Dependencies] ,[OtherCooperative] ,[Trainings] ,[CreditReferences] ,[CreatedBy] ,[CreatedDate]
                       ,[ModifiedBy] ,[ModifiedDate])
	VALUES
                       (@MemberID
					   ,@FirstName
                       ,@MiddleName
                       ,@LastName
                       ,@TinNumber
                       ,@Address
                       ,@CivilStatus
                       ,@Birthdate
                       ,@Birthplace
                       ,@Occupation
                       ,@Salary
                       ,@OtherIncome
                       ,@EducationalAttainment
                       ,@SpouseName
                       ,@Dependencies
                       ,@OtherCooperative
                       ,@Trainings
                       ,@CreditReferences
                       ,@CreatedBy
                       ,@CreatedDate
                       ,@ModifiedBy
                       ,@ModifiedDate);
					   
	SELECT @MemberKey = SCOPE_IDENTITY();
	COMMIT TRANSACTION;
END
GO


