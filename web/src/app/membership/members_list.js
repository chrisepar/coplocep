import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

//Material UI
import field_types from 'app/core/fields/field_types.js';

// Styles
import useStyles from 'styles/_membersList.js';

//Apps
import Layout from "app/core/layout/layout.js";
import Grid from "app/core/dataGrid/dataGrid.js";

const columns = [
    { field: 'membershipNumber', type: field_types.text_field, headerName: 'Membership Number', width: 200 },
    { field: 'name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'tinNumber', type: field_types.text_field, headerName: 'Tin Number', width: 200 },
    { field: 'dateAccepted', type: field_types.text_field, headerName: 'Date Accepted', width: 200 },
    { field: 'BODResolutionNumber', type: field_types.text_field, headerName: 'BOD Resolution Number', width: 200 },
    { field: 'typeOfMembership', type: field_types.text_field, headerName: 'Type of Membership', width: 200 },
    { field: 'numberOfSharesSubbed', type: field_types.text_field, headerName: 'Number of Shares Subscribed', width: 200 },
    { field: 'amountOfSubbed', type: field_types.text_field, headerName: 'Amount Subscribed', width: 200 },
    { field: 'initialPaidUp', type: field_types.text_field, headerName: 'Initial Paid-Up', width: 200 },
    { field: 'address', type: field_types.text_field, headerName: 'Address', width: 200 },
];

var idCounter = 1;

function createData(membershipNumber, name, tinNumber, dateAccepted, BODResolutionNumber, typeOfMembership
    , numberOfSharesSubbed, amountOfSubbed, initialPaidUp, address) {
    idCounter++;
    return {
        id: idCounter,
        membershipNumber: membershipNumber, name: name, tinNumber: tinNumber, dateAccepted: dateAccepted, BODResolutionNumber: BODResolutionNumber, typeOfMembership: typeOfMembership
        , numberOfSharesSubbed: numberOfSharesSubbed, amountOfSubbed: amountOfSubbed, initialPaidUp: initialPaidUp, address: address
    };
}

const data = [
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
    createData("A1", "Casundo, Loren Hannah", "110-496-185", "7/20/1999", "S4", "Regular", 20, 2000, 500, "Brgy IV"),
];

export default function MembersList() {
    const classes = useStyles();

    return (
        <Layout>
            <Grid columns={columns} data={data} />
            {/* <Table data={data} headCells={headCells} isMultiSelect={false} title="Members" /> */}
        </Layout>
    );
};