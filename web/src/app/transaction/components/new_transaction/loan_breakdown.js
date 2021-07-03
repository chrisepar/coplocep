import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CurrencyField from 'app/core/fields/currency_field.js';
import NumberField from "app/core/fields/number_field.js";

export default (props) => {
    const { categoryTitle, category, amount, setAmount, interest, setInterest, term, setTerm } = props;
    return (
        <DialogContent>
            <DialogContentText>
                {categoryTitle}
            </DialogContentText>
            <Grid container spacing={3} >
                <Grid item xs={4}>
                    <CurrencyField id={category} label="Amount" value={amount} onChange={(value) => setAmount(value)} />
                </Grid>
                <Grid item xs={4}>
                    <NumberField id="Interest" label="Interest Percent" maxValue={100}
                        value={interest} onChange={(value) => setInterest(value)} />
                </Grid>
                <Grid item xs={4}>
                    <NumberField id="Term" label="Term" maxValue={60}
                        value={term} onChange={(value) => setTerm(value)} />
                </Grid>
            </Grid>
        </DialogContent>
    );
};