import React, { useEffect, useState } from 'react';

//Material UI
import field_types from 'app/core/fields/field_types.js';
import Loading from 'app/core/helpers/loading_screen.js';

// Styles
import useStyles from 'app/membership/styles/_membersList.js';

//Apps
import Layout from "app/core/layout/layout.js";
import StatusBar from "app/core/dialogs/statusbar.js";

import Table from "app/core/table/table.js";
import { getMemberList, deleteMember } from 'app/membership/member_model.js';

const columns = [
    { field: 'MemberID', type: field_types.text_field, headerName: 'Membership #', width: 100 },
    { field: 'Name', type: field_types.text_field, headerName: 'Name', width: 200 },
    { field: 'TinNumber', type: field_types.text_field, headerName: 'Tin Number', width: 200 },
    { field: 'LastApprovedDate', type: field_types.date_field, headerName: 'Date Accepted', width: 200 },
    { field: 'BODResolutionNumber', type: field_types.text_field, headerName: 'BOD Resolution Number', width: 200 },
    { field: 'TypeOfMembership', type: field_types.text_field, headerName: 'Type of Membership', width: 200 },
    { field: 'SharesSubscribed', type: field_types.text_field, headerName: 'Number of Shares Subscribed', width: 200 },
    { field: 'AmountSubscribed', type: field_types.text_field, headerName: 'Amount Subscribed', width: 200 },
    { field: 'InitialPaidUp', type: field_types.text_field, headerName: 'Initial Paid-Up', width: 200 },
    { field: 'Address', type: field_types.text_field, headerName: 'Address', width: 200 },
];

export default function MembersList(props) {
    const classes = useStyles();
    const pageCount = 8;

    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [trigger, setTrigger] = useState(0);
    const [filterByValue, setFilterByValue] = React.useState("Name");
    const [searchValue, setSetSearchValue] = React.useState("");
    
    const defaultStatus = {
        open: false,
        message: "",
        severity: "info"
    };
    const [status, setStatus] = React.useState(defaultStatus);
    // Handle Status
    const handleStatusClose = () => {
        setStatus(defaultStatus);
    };

    const deleteCallback = (memberKey) => {
        return deleteMember(memberKey).then((data) => {
            if (data) {
                setStatus({
                    open: true,
                    message: "Successfully deleted!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                setStatus({
                    open: true,
                    message: "Error Occured - Delete Failed",
                    severity: "error"
                });
                console.log("Error Occured - Delete Failed");
            }
            setLoading(false);
        }, (error) => {
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });            
            setLoading(false);
        });
    };

    // Get Members List - Start
    useEffect(() => {
        let mounted = true;
        let filters = {
            pageCount: pageCount,
            page: page + 1,
            filterByValue: filterByValue,
            searchValue: searchValue
        };
        getMemberList(filters)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setTrigger(0);
                setLoading(false);
            }, (error) => {
                console.log(error);
                setStatus({
                    open: true,
                    message: "An Error Occured",
                    severity: "error"
                });
            });
        return () => mounted = false;
    }, [trigger, page, filterByValue, searchValue]);
    // End

    return (
        <Layout appName={props.appName}>
            <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
            {
                (isLoading) ? <Loading /> :
                    <Table data={list.results} totalRowCount={list.totalRowCount} columns={columns} title="Members"
                        page={page} setPage={setPage} rowsPerPage={pageCount}
                        filterByValue={filterByValue} setFilterByValue={setFilterByValue}
                        searchValue={searchValue} setSearchValue={setSetSearchValue}
                        deleteCallback={deleteCallback}
                    />
            }
        </Layout>
    );
};