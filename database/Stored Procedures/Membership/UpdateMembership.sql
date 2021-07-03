USE [Coploan]
GO

/****** Object:  StoredProcedure [dbo].[UpdateMembership]    Script Date: 23/05/2021 11:39:07 am ******/
DROP PROCEDURE [dbo].[UpdateMembership]
GO

/****** Object:  StoredProcedure [dbo].[UpdateMembership]    Script Date: 23/05/2021 11:39:07 am ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Cee
-- Create date: May 05, 2021
-- Description:	Update Membership
-- =============================================
CREATE PROCEDURE [dbo].[UpdateMembership] 
	-- Add the parameters for the stored procedure here
	@MemberKey nvarchar(250) = NULL,
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

	UPDATE [dbo].[Members] SET
	[FirstName] = @FirstName
                      ,[MiddleName] = @MiddleName
                      ,[LastName] = @LastName
                      ,[TinNumber] = @TinNumber
                      ,[BODResolutionNumber] = @BODResolutionNumber
                      ,[TypeOfMembership] = @TypeOfMembership
                      ,[SharesSubscribed] = @SharesSubscribed
                      ,[AmountSubscribed] = @AmountSubscribed
                      ,[InitialPaidUp] = @InitialPaidUp
                      ,[Address] = @Address
                      ,[CivilStatus] = @CivilStatus
                      ,[Birthdate] = @Birthdate
                      ,[Birthplace] = @Birthplace
                      ,[Occupation] = @Occupation
                      ,[Salary] = @Salary
                      ,[OtherIncome] = @OtherIncome
                      ,[EducationalAttainment] = @EducationalAttainment
                      ,[SpouseName] = @SpouseName
                      ,[Dependencies] = @Dependencies
                      ,[OtherCooperative] = @OtherCooperative
                      ,[Trainings] = @Trainings
                      ,[CreditReferences] = @CreditReferences
                      ,[ModifiedBy] = @ModifiedBy
                      ,[ModifiedDate] = GETDATE()
                 WHERE  (MemberKey = @MemberKey) 

	COMMIT TRANSACTION;
END
GO


