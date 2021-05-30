import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import appDetails from '_appDetails.js';

import TransactionTable from "app/transaction/components/transaction_table.js";
import { model, getMemberTransactionList, addTransaction } from 'app/transaction/transaction_model.js';

function InterestDetail(props) {
    const category = "Interest";
    let { detailID } = useParams();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(0);

    const addEntry = (amount) => {
        return addTransaction(detailID, amount, category).then((data) => {
            if (data) {
                setTrigger(data);
            }
        });
    };

    useEffect(() => {
        let mounted = true;
        getMemberTransactionList(detailID, category)
            .then(items => {
                if (mounted) {
                    setList(items)
                }
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger]);
    // End

    if (isLoading) {
        return (<Loading />);
    } else {
        return (
            <TransactionTable category={category} rows={list} addEntry={addEntry} categoryTitle="Interest" />
        );
    }
};

export default InterestDetail;