--Deployment October

DELETE UserRoles WHERE Code NOT IN ('CA', 'AD')

INSERT UserRoles VALUES ('AO', 'Approving Officer')

--Insert New Table

CREATE TABLE [dbo].[TypeOfLoans](
	[Code] [nvarchar](2) NOT NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]

INSERT INTO TypeOfLoans
VALUES ('RL', 'Regular Loan')

INSERT INTO TypeOfLoans
VALUES ('CL', 'Calamity Loan')

INSERT INTO TypeOfLoans
VALUES ('EL', 'Emergency Loan')

INSERT INTO TypeOfLoans
VALUES ('SL', 'Special Loan')

--Insert New column to loan
ALTER TABLE Loans
ADD [TypeOfLoan] [nvarchar](100) NULL,
	[ServiceFee] numeric(18,2),
	[InsuranceAmount] numeric(18,2),
	[FixedDepositAmount] numeric(18,2),
	[DocumentationAmount] numeric(18,2),
	[SavingsDepositAmount] numeric(18,2),
	[BalancePreviousLoanAmount] numeric(18,2),
	[InterestPreviousLoanAmount] numeric(18,2)

--Insert New columns to deposit
ALTER TABLE Deposits
ADD [DepositShareCapitalAmount] numeric(18,2),
	[DepositSavings] numeric(18,2)

-- Insert new columns to Payments
ALTER TABLE Payments
ADD Principal numeric(18,2),
	Interest numeric(18,2),
	Penalty numeric(18,2)