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
        public decimal Interest { get; set; }
        public int Term { get; set; }

        public DateTime StartDueDate { get; set; }
    }

    public class LoanDetailsBalance: LoanDetails
    {
        public decimal Balance { get; set; }
    }

    public class InterestDetails : TransactionDetails { }

    public class DepositDetails : TransactionDetails { }

    public class PaymentDetails : TransactionDetails 
    { 
        public int LoanKey { get; set; }
    }

    public class LoanPaymentDetails : TransactionDetails
    {
        public decimal PaidAmount { get; set; }
        public decimal UnpaidAmount { get; set; }
    }

    public class LoanComputation
    {
        public int Month { get; set; }
        public decimal Payment { get; set; }
        public decimal Interest { get; set; }
        public decimal Principal { get; set; }
        public decimal Balance { get; set; }
        //public decimal EndingBalance { get; set; }
    }
}
