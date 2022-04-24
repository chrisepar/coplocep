import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import TransactionTable from "app/transaction/components/common/transaction_table.js";
import LoanTable from "app/transaction/components/loan/loan_table.js";
import { getLoanTransactionList, deleteTransaction } from 'app/transaction/transaction_model.js';

export default (props) => {
    const { paymentReload, loanID, category, categoryTitle } = props;

    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    const deleteCallback = (transactionKey) => {
        return deleteTransaction(transactionKey, category).then((data) => {
            if (data) {
                setTrigger(data);
            }
        });
    };

    useEffect(() => {
        let mounted = true;
        getLoanTransactionList(loanID, category)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger, paymentReload]);
    // End

    if (isLoading) {
        return (<Loading />);
    } else {
        return (
            <TransactionTable category={category} categoryTitle={categoryTitle} rows={list.results}
                deleteCallback={deleteCallback} />
        );
    }
};