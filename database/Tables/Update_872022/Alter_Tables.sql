ALTER TABLE Members
ADD MemberID [nvarchar](250) NOT NULL DEFAULT 0
GO
UPDATE Members SET MemberID = MemberKey WHERE MemberID = 0
GO

--8/13/2022
ALTER TABLE Loans
ADD StartDueDate [datetime] NOT NULL DEFAULT GETDATE()
GO