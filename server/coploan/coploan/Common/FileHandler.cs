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

namespace coploan.Common
{
    public class FileHandler
    {
        public byte[] DownloadComputation(DataTable computationDatatable, DataTable customerDataTable, float amount)
        {
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                int row = 1;
                var ws = wb.Worksheets.Add("Computation");
                double serviceFee = Math.Round((0.01 * amount), 2);

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

                row = 2;
                ws.Cell(row, 1).Value = "(As Required under R.A. 3765 Truth in Lending Act)";
                ws.Range(row, 1, row, 5).Merge();
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                row = 3;
                ws.Cell(row, 1).Value = "SOCIAL SECURITY SYSTEM";
                ws.Range(row, 1, row, 5).Merge();
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                row = 4;
                ws.Range(row, 1, row, 5).Merge();

                // Name of Borrower
                row = 5;
                ws.Cell(row, 1).Value = "NAME OF BORROWER : ";
                ws.Range(row, 1, row, 2).Merge();
                ws.Cell(row, 3).Value = customerDataTable.Rows[0]["Name"];
                ws.Range(row, 3, row, 5).Style.Font.Bold = true;
                ws.Range(row, 3, row, 5).Merge();

                // SSS Number
                row = 6;
                ws.Cell(row, 1).Value = "SSS NUMBER : ";
                ws.Range(row, 1, row, 2).Merge();
                ws.Cell(row, 3).Value = "01-1234567-8";
                ws.Range(row, 3, row, 5).Style.Font.Bold = true;
                ws.Range(row, 3, row, 5).Merge();

                // Address
                row = 7;
                ws.Cell(row, 1).Value = "ADDRESS : ";
                ws.Range(row, 1, row, 2).Merge();
                ws.Cell(row, 3).Value = customerDataTable.Rows[0]["Address"];
                ws.Range(row, 3, row, 3).Style.Font.Bold = true;
                ws.Range(row, 3, row, 4).Merge();

                row = 8;
                ws.Range(row, 1, row, 5).Merge();

                // Loan Amount
                row = 9;
                ws.Cell(row, 1).Value = "1. LOAN AMOUNT";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = amount.ToString();
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Other Charges / Deductions
                row = 10;
                ws.Cell(row, 1).Value = "2. OTHER CHARGE(S) / DEDUCTION(S)";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();

                // Service Fee
                row = 11;
                ws.Cell(row, 1).Value = "  a. Service Fee (1% of loan amount)";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = serviceFee.ToString();
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Balance
                row = 12;
                ws.Cell(row, 1).Value = "  b. Balance of previous loan, if any";
                ws.Range(row, 5, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = 0;
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Balance
                row = 13;
                ws.Cell(row, 1).Value = "3. NEW PROCEEDS OF LOAN (Items 1 less item 2)";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();
                ws.Cell(row, 5).Value = (amount - serviceFee).ToString();
                ws.Range(row, 5, row, 5).Style.NumberFormat.Format = "₱ #,##0.00";
                ws.Range(row, 5, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

                // Schedule of Payments
                row = 14;
                ws.Cell(row, 1).Value = "4. SCHEDULE OF TEMPLATES";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();

                // Data
                row = 15;
                ws.Cell(row, 1).InsertTable(computationDatatable.AsEnumerable());
                ws.Range(row, 1, row, 5).Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Cell(row, 1).SetValue("Month");
                ws.Cell(row, 2).SetValue("Amortization");
                ws.Cell(row, 3).SetValue("Interest");
                ws.Cell(row, 4).SetValue("Principal");
                ws.Cell(row, 5).SetValue("Outstanding Principal Balance");

                int dataRowCount = computationDatatable.Rows.Count;
                ws.Range(row + 1, 2, dataRowCount + 15, 5).Style.NumberFormat.Format = "₱ #,##0.00";

                row = dataRowCount + 16;
                ws.Cell(row, 1).Value = "5. EFFECTIVE INTEREST RATE";
                ws.Range(row, 1, row, 5).Style.Font.Bold = true;
                ws.Range(row, 1, row, 3).Merge();

                row = dataRowCount + 17;
                ws.Cell(row, 1).Value = "Loan shall be charged an interest rate of 10% per anum until fully paid, based on diminishing principal balance,";
                ws.Range(row, 1, row, 5).Merge();

                row = dataRowCount + 18;
                ws.Cell(row, 1).Value = "and shall be amortized over a period of 24 months.";
                ws.Range(row, 1, row, 5).Merge();


                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);
                    
                    return stream.ToArray();
                }
            }
        }
    }
}
