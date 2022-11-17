import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
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
            <Grid container spacing={3} >
                <Grid item xs={4}>
                    <CurrencyField id="DepositAmount" label="Amount"
                        value={newTransactData.Amount} onChange={(value) => handleChange(value, "Amount")} />
                </Grid>
                <Grid item xs={4}>
                    <CurrencyField id="DepositSavings" label="Deposit Savings"
                        value={newTransactData.DepositSavings} onChange={(value) => handleChange(value, "DepositSavings")} />
                </Grid>
                <Grid item xs={4}>
                    <CurrencyField id="DepositShareCapitalAmount" label="Deposit Share Capital Amount"
                        value={newTransactData.DepositShareCapitalAmount} onChange={(value) => handleChange(value, "DepositShareCapitalAmount")} />
                </Grid>
            </Grid>
        </DialogContent>
    );
};