USE [Coploan]
GO
INSERT INTO [dbo].[Transactions]
           ([MemberKey]
           ,[Amount]
           ,[Category]
           ,[IsApproved]
           ,[ApprovedDate]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     VALUES
           ('00001'
           ,1000
           ,'Loan'
		   ,'N'
		   ,NULL
           ,'Cashier'
           ,GETDATE()
           ,'Cashier'
           ,GETDATE())

		   
GO


