import React, { useEffect, useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CurrencyField from 'app/core/fields/currency_field.js';
import Loading from 'app/core/helpers/loading_screen.js';


export default (props) => {
    const { categoryTitle, category, newTransactData, setNewTransactData, status, setStatus, setDialogStatus, dialogStatus } = props;

    const handleChange = (value, field) => {
        var newDetail = _.clone(newTransactData);
        newDetail[field] = value;
        setNewTransactData(newDetail);
    };

    useEffect(() => {
        let mounted = true;
        setDialogStatus({ ...dialogStatus, isLoading: false })
        return () => mounted = false;
    }, [])

    return (
        <DialogContent>
            {(dialogStatus.isLoading || dialogStatus.isLoading === null) ? <Loading /> : null}
            <CurrencyField id={category} label="Amount" value={newTransactData.Amount} onChange={(value) => handleChange(value, "Amount")} />
        </DialogContent>
    );
};