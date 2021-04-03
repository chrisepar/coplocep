import React from 'react';
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

const columns = [
    { field: 'membershipNumber', type: field_types.text_field, headerName: 'Membership #', width: 200 },
    { field: 'name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'depositAmount', type: field_types.number_field, headerName: 'Fixed Deposit as of <month year>', width: 200, hasTotal: true },
    { field: 'loanAmount', type: field_types.number_field, headerName: 'Loan as of <month year>', width: 200, hasTotal: true },
    { field: 'interestPaidAmount', type: field_types.number_field, headerName: 'Interest Paid for <year>', width: 200, hasTotal: true },
    { field: 'averageShareAmount', type: field_types.number_field, headerName: 'Average Share', width: 200, hasTotal: true }
];

var idCounter = 1;

function createData(membershipNumber, name, depositAmount, loanAmount, interestPaidAmount, averageShareAmount) {
    idCounter++;
    return {
        id: idCounter,
        membershipNumber, name, depositAmount, loanAmount, interestPaidAmount, averageShareAmount
    };
}

const data = [
    createData("A1", "Casundo, Loren Hannah", 20600.00, 20080.83, 0, 0),
    createData("A2", "Casundo, Loren test", 400, 20, 42, 34),
];

export default function LoansList(props) {
    const classes = useStyles();

    return (
        <Layout appName={props.appName}>
            <Table data={data} columns={columns} isMultiSelect={false} title="Loans" editable={true}/>
        </Layout>
    );
};