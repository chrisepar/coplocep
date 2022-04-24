import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import TransactionTable from "app/transaction/components/common/transaction_table.js";
import { getMemberTransactionList, addTransaction, deleteTransaction } from 'app/transaction/transaction_model.js';

export default (props) => {
    const category = "Deposit";

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
            <TransactionTable category={category} categoryTitle="Deposit" rows={list.results} addCallback={addCallback}
                deleteCallback={deleteCallback} totalRowCount={list.totalRowCount} page={page} setPage={setPage}/>
        );
    }
};