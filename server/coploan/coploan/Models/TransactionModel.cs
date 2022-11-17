﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace coploan.Models
{
    public class TransactionDetails
    {
        public int TransactionKey { get; set; }
        public int MemberKey { get; set; }
        public decimal Amount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

    }

    public class LoanDetails: TransactionDetails
    {
        public DateTime StartDueDate { get; set; }
        public decimal Interest { get; set; }
        public int Term { get; set; }
        public string TypeOfLoan { get; set; }
        public decimal ServiceFee { get; set; }
        public decimal InsuranceAmount { get; set; }
        public decimal FixedDepositAmount { get; set; }
        public decimal DocumentationAmount { get; set; }
        public decimal SavingsDepositAmount { get; set; }
        public decimal BalancePreviousLoanAmount { get; set; }
        public decimal InterestPreviousLoanAmount { get; set; }
    }

    public class LoanDetailsBalance: LoanDetails
    {
        public decimal Balance { get; set; }
    }

    public class InterestDetails : TransactionDetails { }

    public class DepositDetails : TransactionDetails 
    { 
        public decimal DepositSavings { get; set; }
        public decimal DepositShareCapitalAmount { get; set; }
    }

    public class PaymentDetails : TransactionDetails 
    { 
        public int LoanKey { get; set; }
        public decimal Interest { get; set; }
        public decimal Principal { get; set; }
        public decimal Penalty { get; set; }
    }

    public class LoanPaymentDetails : TransactionDetails
    {
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }
    }

    public class LoanComputation
    {
        public decimal Amount { get; set; }
        public int Term { get; set; }
        public decimal Payment { get; set; }
        public decimal Interest { get; set; }
        public decimal Principal { get; set; }
        public decimal Balance { get; set; }
        public decimal ServiceFee { get; set; }
        public decimal InsuranceAmount { get; set; }
        public decimal FixedDepositAmount { get; set; }
        public decimal DocumentationAmount { get; set; }
        public decimal SavingsDepositAmount { get; set; }
        public decimal BalancePreviousLoanAmount { get; set; }
        public decimal InterestPreviousLoanAmount { get; set; }

    }

    public class ComputedMonthlyLoan
    {
        public int Month { get; set; }
        public decimal Payment { get; set; }
        public decimal Interest { get; set; }
        public decimal Principal { get; set; }
        public decimal Balance { get; set; }
    }
}
