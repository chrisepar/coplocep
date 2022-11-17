import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import LoanTable from "app/transaction/components/loan/loan_table.js";
import { getMemberTransactionList, addTransaction, deleteTransaction } from 'app/transaction/transaction_model.js';
import { approveRecord, rejectRecord } from "app/approval_workflow/approval_workflow_model.js";
import StatusBar from "app/core/dialogs/statusbar.js";

export default (props) => {
    const category = "Loan";
    const pageCount = 4;
    let { detailID } = useParams();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(null);
    const [trigger, setTrigger] = useState(0);
    const [page, setPage] = React.useState(0);
    const [searchValue, setSetSearchValue] = React.useState("NoFilter");

    const defaultStatus = {
        open: false,
        message: "",
        severity: "info"
    };

    const [status, setStatus] = React.useState(defaultStatus);

    // Handle Status Close
    const handleStatusClose = () => {
        setStatus(defaultStatus);
    };

    const addCallback = (data) => {
        setLoading(true);
        return addTransaction(detailID, category, data).then((data) => {
            setLoading(false);
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully added!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                setStatus({
                    open: true,
                    message: "Error Occured - Add Failed",
                    severity: "error"
                });
                console.log("Error Occured - Add Failed");
            }
        }, (error) => {
            setLoading(false);
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    const deleteCallback = (transactionKey) => {
        setLoading(true);
        return deleteTransaction(transactionKey, category).then((data) => {
            setLoading(false);
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully deleted!",
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
        }, (error) => {
            setLoading(false);
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    const approveCallback = (transactionKey, comment) => {
        setLoading(true);
        return approveRecord(transactionKey, category, comment).then((data) => {
            setLoading(false);
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully approved!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                setStatus({
                    open: true,
                    message: "Error Occured - Approve Failed",
                    severity: "error"
                });
                console.log("Error Occured - Approve Failed");
            }
        }, (error) => {
            setLoading(false);
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    const rejectCallback = (transactionKey, comment) => {
        setLoading(true);
        return rejectRecord(transactionKey, category, comment).then((data) => {
            setLoading(false);
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully rejected!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                setStatus({
                    open: true,
                    message: "Error Occured - Reject Failed",
                    severity: "error"
                });
                console.log("Error Occured - Reject Failed");
            }
        }, (error) => {
            setLoading(false);
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    useEffect(() => {
        let mounted = true;
        let filters = {
            pageCount: pageCount,
            page: page + 1,
            filterByValue: "CreatedDate",
            searchValue: searchValue
        };

        getMemberTransactionList(detailID, category, filters)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setTrigger(0);
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger, page, searchValue]);
    // End

    if (isLoading === null) {
        return (<Loading />);
    } else {
        return (
            <React.Fragment>
                {(isLoading) ? <Loading /> : null}
                <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
                <LoanTable rows={list.results} totalRowCount={list.totalRowCount} addCallback={addCallback} deleteCallback={deleteCallback}
                    approveCallback={approveCallback} rejectCallback={rejectCallback} page={page} setPage={setPage} rowsPerPage={pageCount}
                    setSetSearchValue={setSetSearchValue} searchValue={searchValue} setLoading={setLoading} />
            </React.Fragment>
        );
    }
};