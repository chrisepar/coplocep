import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

//Material UI
import field_types from 'app/core/fields/field_types.js';

// Styles
import useStyles from 'styles/_loansList.js';

//Apps
import Layout from "app/core/layout/layout.js";
// import Grid from "app/core/dataGrid/dataGrid.js";
import Table from "app/core/table/table.js";

import appDetails from '_appDetails.js';

const columns = [
    { field: 'MemberKey', type: field_types.text_field, headerName: 'Membership #', width: 100 },
    { field: 'Name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'DepositAmount', type: field_types.number_field, headerName: 'Fixed Deposit as of <month year>', width: 200, hasTotal: true },
    { field: 'LoanAmount', type: field_types.number_field, headerName: 'Loan as of <month year>', width: 200, hasTotal: true },
    { field: 'InterestPaidAmount', type: field_types.number_field, headerName: 'Interest Paid for <year>', width: 200, hasTotal: true },
    { field: 'AverageShareAmount', type: field_types.number_field, headerName: 'Average Share', width: 200, hasTotal: true }
];

const getMemberLoanList = () => {
    return fetch(appDetails.apiRoute + 'membership/loans')
        .then(data => data.json())
};

export default function LoansList(props) {
    const classes = useStyles();

    // Get Members Loan List - Start
    const [list, setList] = useState([]);
    useEffect(() => {
        let mounted = true;
        getMemberLoanList()
            .then(items => {
                if (mounted) {
                    setList(items)
                }
            })
        return () => mounted = false;
    }, []);
    // End

    return (
        <Layout appName={props.appName}>
            <Table data={list} columns={columns} isMultiSelect={false} title="Loans" editable={true}
            searchBy="Name"/>
        </Layout>
    );
};