import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

//Material UI
import field_types from 'app/core/fields/field_types.js';
import Loading from 'app/core/helpers/loading_screen.js';

// Styles
import useStyles from 'app/transaction/styles/_transactionList.js';

//Apps
import Layout from "app/core/layout/layout.js";
import Table from "app/core/table/table.js";
import { getMembersWithTransaction } from 'app/transaction/transaction_model.js';

const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const columns = [
    { field: 'MemberID', type: field_types.text_field, headerName: 'Membership #', width: 100 },
    { field: 'Name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'DepositAmount', type: field_types.number_field, headerName: 'Fixed Deposit as of ' + monthList[currentMonth] + " " + currentYear, width: 200 },
    { field: 'LoanAmount', type: field_types.number_field, headerName: 'Loan as of ' + monthList[currentMonth] + " " + currentYear, width: 200 },
    { field: 'InterestPaidAmount', type: field_types.number_field, headerName: 'Interest Paid for ' + currentYear, width: 200 },
    { field: 'AverageShareAmount', type: field_types.number_field, headerName: 'Average Share', width: 200 }
];

export default (props) => {
    const { classes } = useStyles();
    const pageCount = 9;

    // Get Members Transaction List - Start
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [filterByValue, setFilterByValue] = React.useState("Name");
    const [searchValue, setSetSearchValue] = React.useState("");

    useEffect(() => {
        let mounted = true;
        let filters = {
            pageCount: pageCount,
            page: page + 1,
            filterByValue: filterByValue,
            searchValue: searchValue
        };
        getMembersWithTransaction(filters)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setLoading(false);
            })
        return () => mounted = false;
    }, [page, filterByValue, searchValue]);
    // End

    return (
        <Layout appName={props.appName}>
            {
                (isLoading) ? <Loading /> :
                    <Table data={list.results} columns={columns} totalRowCount={list.totalRowCount} title="Transactions"
                        searchBy="Name" page={page} setPage={setPage} rowsPerPage={pageCount}
                        filterByValue={filterByValue} setFilterByValue={setFilterByValue}
                        searchValue={searchValue} setSearchValue={setSetSearchValue}
                    />
            }
        </Layout>
    );
};