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

        private EnumerableRowCollection<DataRow> CreateDateFilter(DataTable results, string searchBy)
        {
            string filterBy = "CreatedDate";
            EnumerableRowCollection<DataRow> tempRows = null;
            switch (searchBy)
            {
                case "NoFilter":
                    tempRows = results.AsEnumerable();
                    break;
                case "Daily":
                    tempRows = results.AsEnumerable().Where(rows => (rows.Field<DateTime>(filterBy).Date == DateTime.Today));
                    break;
                case "Week":
                    DateTime start = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek),
                        end = start.AddDays(7);
                    tempRows = results.AsEnumerable().Where(rows => (rows.Field<DateTime>(filterBy).Date >= start.Date && rows.Field<DateTime>(filterBy).Date < end.Date));
                    break;
                case "Month":
                    tempRows = results.AsEnumerable().Where(rows => (rows.Field<DateTime>(filterBy).Date.Month == DateTime.Today.Month));
                    break;
                case "Annual":
                    tempRows = results.AsEnumerable().Where(rows => (rows.Field<DateTime>(filterBy).Date.Year == DateTime.Today.Year));
                    break;
            }
            return tempRows;
        }
        public Dictionary<string, object> GetDataByPage(DataTable results)
        {
            Dictionary<string, object> finalResult = new Dictionary<string, object>();

            DataTable filteredResults = results.Clone();

            bool hasRows = results.Rows.Count > 0;
            if (hasRows)
            {
                if (!String.IsNullOrEmpty(filterBy))
                {
                    EnumerableRowCollection<DataRow> tempRows = null;
                    switch (filterBy) {
                        case "CreatedDate":
                            tempRows = CreateDateFilter(results, searchBy);
                            break;
                        default:
                            string dataType = results.Columns[filterBy].DataType.Name;

                            if (String.IsNullOrEmpty(searchBy))
                            {
                                tempRows = results.AsEnumerable().Where(rows => ("").Contains(searchBy));
                            }
                            else
                            {
                                switch (dataType)
                                {
                                    case "String":
                                        tempRows = results.AsEnumerable().Where(rows => (rows.Field<string>(filterBy) ?? "").ToLower().Contains(searchBy.ToLower()));
                                        break;
                                    case "Int32":
                                        tempRows = results.AsEnumerable().Where(rows => (rows.Field<Int32>(filterBy)).Equals(Int32.Parse(searchBy)));
                                        break;
                                    default:
                                        tempRows = results.AsEnumerable().Where(rows => (rows.Field<string>(filterBy) ?? "").Contains(searchBy));
                                        break;
                                }
                            }
                            break;
                    }
                    if (tempRows.Any())
                        filteredResults = tempRows.CopyToDataTable();
                }
                else
                {
                    filteredResults = results.AsEnumerable().CopyToDataTable();
                }
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
