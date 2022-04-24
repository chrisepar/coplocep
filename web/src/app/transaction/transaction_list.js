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

const columns = [
    { field: 'MemberKey', type: field_types.text_field, headerName: 'Membership #', width: 100 },
    { field: 'Name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'DepositAmount', type: field_types.number_field, headerName: 'Fixed Deposit as of <month year>', width: 200 },
    { field: 'LoanAmount', type: field_types.number_field, headerName: 'Loan as of <month year>', width: 200 },
    { field: 'InterestPaidAmount', type: field_types.number_field, headerName: 'Interest Paid for <year>', width: 200 },
    { field: 'AverageShareAmount', type: field_types.number_field, headerName: 'Average Share', width: 200 }
];

export default (props) => {
    const classes = useStyles();
    const pageCount = 8;

    // Get Members Transaction List - Start
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        let mounted = true;
        getMembersWithTransaction(pageCount, page + 1)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setLoading(false);
            })
        return () => mounted = false;
    }, [page]);
    // End

    return (
        <Layout appName={props.appName}>
            {
                (isLoading) ? <Loading /> :
                    <Table data={list.results} columns={columns} totalRowCount={list.totalRowCount} title="Transactions"
                        searchBy="Name" page={page} setPage={setPage} rowsPerPage={pageCount} />
            }
        </Layout>
    );
};