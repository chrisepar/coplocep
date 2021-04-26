USE [Coploan]
GO

INSERT INTO [dbo].[Members]
           ([Key]
           ,[FirstName]
           ,[MiddleName]
           ,[LastName]
           ,[TinNumber]
           ,[DateAccepted]
           ,[IsAccepted]
           ,[BODResolutionNumber]
           ,[TypeOfMembership]
           ,[SharesSubscribed]
           ,[AmountSubscribed]
           ,[InitialPaidUp]
           ,[Address]
           ,[CivilStatus]
           ,[Birthdate]
           ,[Birthplace]
           ,[Occupation]
           ,[Salary]
           ,[OtherIncome]
           ,[EducationalAttainment]
           ,[SpouseName]
           ,[Dependencies]
           ,[OtherCooperative]
           ,[Trainings]
           ,[CreditReferences]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     VALUES
           ('00001'
           ,'John'
           ,''
           ,'Doe'
           ,'423938283192'
           ,NULL
           ,'N'
           ,'S4'
           ,'Regular'
           ,20
           ,2000
           ,500
           ,'Brgy. 20392 Sonsensie, Seoul'
           ,'Single'
           ,'1/3/1995'
           ,'Korea'
           ,'Software Engineer'
           ,100000.50
           ,'Cafe Waiter'
           ,'Grudate School'
           ,'Ko Munyeoung'
           ,2
           ,NULL
           ,NULL
           ,NULL
           ,'Cashier'
           ,GETDATE()
           ,'Cashier'
           ,GETDATE())
GO


