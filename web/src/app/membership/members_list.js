import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

//Material UI
import field_types from 'app/core/fields/field_types.js';

// Styles
import useStyles from 'styles/_membersList.js';

//Apps
import Layout from "app/core/layout/layout.js";
// import Grid from "app/core/dataGrid/dataGrid.js";
import Table from "app/core/table/table.js";

import appDetails from '_appDetails.js';

const columns = [
    { field: 'MemberKey', type: field_types.text_field, headerName: 'Membership #', width: 100 },
    { field: 'Name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'TinNumber', type: field_types.text_field, headerName: 'Tin Number', width: 200 },
    { field: 'DateAccepted', type: field_types.text_field, headerName: 'Date Accepted', width: 200 },
    { field: 'BODResolutionNumber', type: field_types.text_field, headerName: 'BOD Resolution Number', width: 200 },
    { field: 'TypeOfMembership', type: field_types.text_field, headerName: 'Type of Membership', width: 200 },
    { field: 'SharesSubscribed', type: field_types.text_field, headerName: 'Number of Shares Subscribed', width: 200 },
    { field: 'AmountSubscribed', type: field_types.text_field, headerName: 'Amount Subscribed', width: 200 },
    { field: 'InitialPaidUp', type: field_types.text_field, headerName: 'Initial Paid-Up', width: 200 },
    { field: 'Address', type: field_types.text_field, headerName: 'Address', width: 200 },
];

const getMemberList = () => {
    return fetch(appDetails.apiRoute + 'membership/list')
        .then(data => data.json())
};

export default function MembersList(props) {
    const classes = useStyles();
    const [list, setList] = useState([]);

    // Get Members List - Start
    useEffect(() => {
        let mounted = true;
        getMemberList()
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
            <Table data={list} columns={columns} isMultiSelect={false} title="Members" editable={true}
                searchBy="Name"
             />
        </Layout>
    );
};