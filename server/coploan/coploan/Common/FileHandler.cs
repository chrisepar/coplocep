using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ClosedXML.Excel;
using System.Data;
using coploan.Models;

namespace coploan.Common
{
    public class FileHandler
    {
        public byte[] DownloadComputation(DataTable computationDatatable, DataTable customerDataTable, LoanComputation data)
        {
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                int row = 1;
                float amount = (float)data.Amount;
                var ws = wb.Worksheets.Add("Computation");
                double serviceFee = Math.Round((0.02 * amount), 2);

                // Column Width
                ws.Columns("A:A").Width = 8;
                ws.Columns("B:B").Width = 20;
                ws.Columns("C:C").Width = 20;
                ws.Columns("D:D").Width = 20;
                ws.Columns("E:E").Width = 50;

                ws.Cell(row, 1).Value = "DISCLOSURE STATEMENT ON LOAN/CREDIT TRANSACTION";
                ws.Range(row, 1, row, 5).Merge();
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                row++;
                ws.Cell(row, 1).Value = "(As Required under R.A. 3765 Truth in Lending Act)";
                ws.Range(row, 1, row, 5).Merge();
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                row++;
                ws.Cell(row, 1).Value = "MATAASNAKAHOY CREDIT COOPERATIVE";
                ws.Range(row, 1, row, 5).Merge();
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                row++;
                ws.Range(row, 1, row, 5).Merge();

                // Name of Borrower
                row++;
                ws.Cell(row, 1).Value = "NAME OF BORROWER : ";
                ws.Range(row, 1, row, 2).Merge();
                ws.Cell(row, 3).Value = customerDataTable.Rows[0]["Name"];
                ws.Range(row, 3, row, 5).Style.Font.Bold = true;
                ws.Range(row, 3, row, 5).Merge();

                // SSS Number
                row++;
                ws.Cell(row, 1).Value = "MEMBERSHIP NUMBER : ";
                ws.Range(row, 1, row, 2).Merge();
                ws.Cell(row, 3).Value = customerDataTable.Rows[0]["MemberID"];
                ws.Range(row, 3, row, 5).Style.Font.Bold = true;
                ws.Range(row, 3, row, 5).Merge();
                ws.Range(row, 3, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

                // Address
                row++;
                ws.Cell(row, 1).Value = "ADDRESS : ";
                ws.Range(row, 1, row, 2).Merge();
                ws.Cell(row, 3).Value = customerDataTable.Rows[0]["Address"];
                ws.Range(row, 3, row, 3).Style.Font.Bold = true;
                ws.Range(row, 3, row, 4).Merge();

                row++;
                ws.Range(row, 1, row, 5).Merge();

                // Loan Amount
                row++;
                ws.Cell(row, 1).Value = "1. LOAN AMOUNT";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = amount.ToString();
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Other Charges / Deductions
                row++;
                ws.Cell(row, 1).Value = "2. OTHER CHARGE(S) / DEDUCTION(S)";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();

                // Service Fee
                row++;
                ws.Cell(row, 1).Value = "  a. Service Fee (2% of loan amount)";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = serviceFee.ToString();
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Insurance
                row++;
                ws.Cell(row, 1).Value = "  b. Insurance";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = data.InsuranceAmount;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Fixed Deposit
                row++;
                ws.Cell(row, 1).Value = "  c. Fixed Deposit";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = data.FixedDepositAmount;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Documentation
                row++;
                ws.Cell(row, 1).Value = "  d. Documentation";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = data.DocumentationAmount;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Savings Deposit
                row++;
                ws.Cell(row, 1).Value = "  e. Savings Deposit";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = data.SavingsDepositAmount;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Balance of previous loan
                row++;
                ws.Cell(row, 1).Value = "  f. Balance of previous loan, if any";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = data.BalancePreviousLoanAmount;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Interest of Previous loan
                row++;
                ws.Cell(row, 1).Value = "  g. Interest of previous loan, if any";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = data.InterestPreviousLoanAmount;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Total Charge
                row++;
                ws.Cell(row, 1).Value = "TOTAL CHARGE(S) / DEDUCTION(S)";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).FormulaA1 = "=SUM(E11:E17)";
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Balance
                row = row + 2;
                ws.Cell(row, 1).Value = "3. NEW PROCEEDS OF LOAN (Items 1 less item 2)";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).FormulaA1 = "=E9-E18";
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Schedule of Payments
                row++;
                ws.Cell(row, 1).Value = "4. SCHEDULE OF TEMPLATES";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();

                // Data
                row++;
                ws.Cell(row, 1).InsertTable(computationDatatable.AsEnumerable());
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;

                int dataRowCount = computationDatatable.Rows.Count;
                ws.Range(row + 1, 2, dataRowCount + row, 5).Style.NumberFormat.Format = "₱ #,##0.00";

                // 5 - Interest
                row = dataRowCount + row + 2;
                ws.Cell(row, 1).Value = "5. INTEREST";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).FormulaA1 = "=SUM(Table1[Interest])";
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                row = row + 4;
                ws.Cell(row, 1).Value = "Conforme: ______________________________________";
                ws.Range(row, 1, row, 3).Merge();

                row = row + 2;
                ws.Cell(row, 1).Value = "CV NO.:";
                ws.Cell(row, 2).Value = "____________________";

                row++;
                ws.Cell(row, 1).Value = "CHECK NO.:";
                ws.Cell(row, 2).Value = "____________________";

                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    
                    return stream.ToArray();
                }
            }
        }
    
        public byte[] DownloadTable(DataTable datatable, string name)
        {
            using (XLWorkbook wb = new XLWorkbook())
            {
                var ws = wb.Worksheets.Add(name);
                int dataRowCount = datatable.Rows.Count;
                int dataColumnCount = datatable.Columns.Count;
                ws.Cell(1, 1).InsertTable(datatable.AsEnumerable());
                ws.Range(1, 1, 1, dataColumnCount).Style.Font.Bold = true;
                ws.Range(2, 1, dataRowCount, dataColumnCount).Style.NumberFormat.Format = "₱ #,##0.00";

                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);

                    return stream.ToArray();
                }

            }
        }
    
    }
}
