import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import LoanTable from "app/transaction/components/loan/loan_table.js";
import { getMemberTransactionList, addTransaction, deleteTransaction } from 'app/transaction/transaction_model.js';
import { approveRecord, rejectRecord } from "app/approval_workflow/approval_workflow_model.js";

export default (props) => {
    const category = "Loan";
    let { detailID } = useParams();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);
    const [page, setPage] = React.useState(0);

    const addCallback = (amount, interest = null, term = null) => {
        return addTransaction(detailID, category, { amount: amount, interest: interest, term: term }).then((data) => {
            if (data) {
                setTrigger(data);
            }
        });
    };

    const deleteCallback = (transactionKey) => {
        return deleteTransaction(transactionKey, category).then((data) => {
            if (data) {
                setTrigger(data);
            }
        });
    };

    const approveCallback = (transactionKey, comment) => {
        return approveRecord(transactionKey, category, comment).then((data) => {
            if (data) {
                setTrigger(data);
            }
        });
    };

    const rejectCallback = (transactionKey, comment) => {
        return rejectRecord(transactionKey, category, comment).then((data) => {
            if (data) {
                setTrigger(data);
            }
        });
    };

    useEffect(() => {
        let mounted = true;
        getMemberTransactionList(detailID, category, page + 1)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger, page]);
    // End

    if (isLoading) {
        return (<Loading />);
    } else {
        return (
            <LoanTable rows={list.results} totalRowCount={list.totalRowCount} addCallback={addCallback} deleteCallback={deleteCallback}
                approveCallback={approveCallback} rejectCallback={rejectCallback} page={page} setPage={setPage} />
        );
    }
};