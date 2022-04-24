import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import TransactionTable from "app/transaction/components/common/transaction_table.js";
import LoanTable from "app/transaction/components/loan/loan_table.js";
import { getMemberTransactionList, addTransaction, deleteTransaction } from 'app/transaction/transaction_model.js';
import { approveRecord, rejectRecord } from "app/approval_workflow/approval_workflow_model.js";

function TransactionDetail(props) {
    const { category, categoryTitle } = props;

    let { detailID } = useParams();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

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
        getMemberTransactionList(detailID, category)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger]);
    // End

    if (isLoading) {
        return (<Loading />);
    } else {
        switch (category) {
            case "Loan":
                return (
                    <LoanTable rows={list.results} addCallback={addCallback}
                        deleteCallback={deleteCallback} approveCallback={approveCallback} rejectCallback={rejectCallback} categoryTitle={categoryTitle} />
                );
            default:
                return (
                    <TransactionTable category={category} rows={list.results} addCallback={addCallback} 
                        deleteCallback={deleteCallback} categoryTitle={categoryTitle} />
                );
        }
    }
};

export default TransactionDetail;