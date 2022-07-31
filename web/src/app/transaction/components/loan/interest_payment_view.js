import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Loading from 'app/core/helpers/loading_screen.js';

import TransactionTable from "app/transaction/components/common/transaction_table.js";
import { getLoanTransactionList, deleteTransaction } from 'app/transaction/transaction_model.js';

export default (props) => {
    const { paymentReload, loanID, category, categoryTitle } = props;
    const pageCount = 4;

    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [trigger, setTrigger] = useState(0);
    const [searchValue, setSetSearchValue] = React.useState("NoFilter");

    const deleteCallback = (transactionKey) => {
        return deleteTransaction(transactionKey, category).then((data) => {
            if (data) {
                setTrigger(data);
            }
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
        getLoanTransactionList(loanID, category, filters)
            .then(data => {
                if (mounted) {
                    setList(data);
                }
                setTrigger(false);
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger, paymentReload, page]);
    // End

    if (isLoading) {
        return (<Loading />);
    } else {
        return (
            <TransactionTable category={category} categoryTitle={categoryTitle} rows={list.results} totalRowCount={list.totalRowCount}
                deleteCallback={deleteCallback} page={page} setPage={setPage} rowsPerPage={pageCount}
                setSetSearchValue={setSetSearchValue} searchValue={searchValue}  />
        );
    }
};