using coploan.Common;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using coploan.Models;
using System.Text;
using System.Linq;

namespace coploan.Common
{
    public class BusinessObjects
    {
        private static int page;
        private static int pageCount;
        private static string searchBy;
        private static string filterBy;
        public static IConfiguration config;
        public static UserRole currentUser;

        public static void InitConfiguration(IConfiguration configuration)
        {
            config = configuration;
        }

        public static void InitFilters(IQueryCollection query)
        {
            if(!query.TryGetValue("page", out var page))
            {
                BusinessObjects.page = 1;
            } else
            {
                BusinessObjects.page = Int32.Parse(page);
            }

            if (!query.TryGetValue("pageCount", out var pageCount))
            {
                BusinessObjects.pageCount = 5;
            }
            else
            {
                BusinessObjects.pageCount = Int32.Parse(pageCount);
            }

            if (!query.TryGetValue("filterBy", out var filterBy))
            {
                BusinessObjects.filterBy = "";
            }
            else
            {
                BusinessObjects.filterBy = filterBy;
            }

            if (!query.TryGetValue("searchBy", out var searchBy))
            {
                BusinessObjects.searchBy = "";
            }
            else
            {
                BusinessObjects.searchBy = searchBy;
            }
        }

        public static void InitCurrentUser(UserRole currentUser)
        {
            BusinessObjects.currentUser = currentUser;
        }
        public Dictionary<string, object> GetDataByPage(DataTable results)
        {
            Dictionary<string, object> finalResult = new Dictionary<string, object>();

            DataTable filteredResults = results.Clone();

            if (!String.IsNullOrEmpty(filterBy))
            {
                StringBuilder expression = new StringBuilder();
                expression.AppendFormat("{0} LIKE '%{1}%'", filterBy, searchBy);
                var tempRows = results.AsEnumerable().Where(rows => (rows.Field<string>(filterBy) ?? "").Contains(searchBy));
                if (tempRows.Any())
                    filteredResults = tempRows.CopyToDataTable();
            } else
            {
                filteredResults = results.AsEnumerable().CopyToDataTable();
            }

            DataTable newResults = filteredResults.Clone();
            int pageNumber = page - 1;
            int startingIndex = (pageCount * pageNumber);
            int endingIndex = (pageCount * (pageNumber + 1));
            int lastIndex = (endingIndex > filteredResults.Rows.Count) ? filteredResults.Rows.Count : endingIndex;
            for (int index = startingIndex; index < lastIndex; index++)
            {
                newResults.ImportRow(filteredResults.Rows[index]);
            }
            finalResult.Add("results", newResults);
            finalResult.Add("totalRowCount", filteredResults.Rows.Count);
            return finalResult;
        }
    }
}
