import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CurrencyField from 'app/core/fields/currency_field.js';
import Loading from 'app/core/helpers/loading_screen.js';


export default (props) => {
    const { categoryTitle, category, newTransactData, setNewTransactData, isLoading, setLoading, status, setStatus } = props;

    const handleChange = (value, field) => {
        var newDetail = _.clone(newTransactData);
        newDetail[field] = value;
        setNewTransactData(newDetail);
    };

    useEffect(() => {
        let mounted = true;
        setLoading(false);
        return () => mounted = false;
    }, [])

    return (
        <DialogContent>
            {(isLoading || isLoading === null) ? <Loading /> : null}
            <CurrencyField id={category} label="Amount" value={newTransactData.amount} onChange={(value) => handleChange(value, "amount")} />
        </DialogContent>
    );
};