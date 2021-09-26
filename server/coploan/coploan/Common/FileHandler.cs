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
        public byte[] DownloadFile(DataTable dt, string workSheetName)
        {
            using (XLWorkbook wb = new XLWorkbook())
            {
                //Add DataTable in worksheet  
                wb.Worksheets.Add(dt, workSheetName);
                using (MemoryStream stream = new MemoryStream())
                {
                    wb.SaveAs(stream);

                    return stream.ToArray();
                }
            }
        }
    }
}
