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
    const [isLoading, setLoading] = useState(true);
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

    const addCallback = (amount, interest = null, term = null) => {
        return addTransaction(detailID, category, { amount: amount, interest: interest, term: term }).then((data) => {
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully added!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                console.log("Error Occured - Add Failed");
            }
        }, (error) => {
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    const deleteCallback = (transactionKey) => {
        return deleteTransaction(transactionKey, category).then((data) => {
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully deleted!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                console.log("Error Occured - Delete Failed");
            }
        }, (error) => {
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    const approveCallback = (transactionKey, comment) => {
        return approveRecord(transactionKey, category, comment).then((data) => {
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully approved!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                console.log("Error Occured - Approve Failed");
            }
        }, (error) => {
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
        });
    };

    const rejectCallback = (transactionKey, comment) => {
        return rejectRecord(transactionKey, category, comment).then((data) => {
            if (data) {
                setStatus({
                    open: true,
                    message: category + " successfully rejected!",
                    severity: "success"
                });
                setTrigger(data);
            } else {
                console.log("Error Occured - Reject Failed");
            }
        }, (error) => {
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
                setTrigger(false);
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger, page, searchValue]);
    // End

    if (isLoading) {
        return (<Loading />);
    } else {
        return (
            <React.Fragment>
                <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
                <LoanTable rows={list.results} totalRowCount={list.totalRowCount} addCallback={addCallback} deleteCallback={deleteCallback}
                    approveCallback={approveCallback} rejectCallback={rejectCallback} page={page} setPage={setPage} rowsPerPage={pageCount}
                    setSetSearchValue={setSetSearchValue} searchValue={searchValue} />
            </React.Fragment>
        );
    }
};