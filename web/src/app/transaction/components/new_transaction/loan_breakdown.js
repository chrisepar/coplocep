import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CurrencyField from 'app/core/fields/currency_field.js';
import NumberField from "app/core/fields/number_field.js";
import Loading from 'app/core/helpers/loading_screen.js';
import Button from 'app/core/button/core_button.js';

import { model, getSettings } from "app/settings/settings_model.js";

import { downloadComputation } from 'app/transaction/transaction_model.js';


export default (props) => {
    const { categoryTitle, category, setAmount, setInterest, setTerm, amount, interest, term } = props;

    const [isLoading, setLoading] = useState(null);
    const [settingsDetails, setSettingDetails] = useState(model);

    useEffect(() => {
        let mounted = true;
        getSettings().then((items) => {
            if (mounted && items.length > 0) {
                console.log("Success Get");
                const item = items[0];
                setSettingDetails(item);
                setInterest(item.DefaultInterest);
                setTerm(item.MaxTerm);
            } else {
                console.log("Fail Get");
            }
            setLoading(false);
        })
        return () => mounted = false;
    }, [])

    const handleCalculate = (event) => {
        downloadComputation(amount, interest, term);
    };


    console.log("Render");
    return (
        <DialogContent>
            {(isLoading) ? <Loading /> : null}
            <Grid container spacing={3} >
                <Grid item xs={3}>
                    <CurrencyField id={category} label="Amount" value={amount} onChange={(value) => setAmount(value)} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="Interest" label="Interest Rate" maxValue={100} fixedDecimalScale
                        value={interest} onChange={(value) => setInterest(value)} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="Term" label="Term" maxValue={settingsDetails.MaxTerm} decimalScale={0}
                        value={term} onChange={(value) => setTerm(value)} />
                </Grid>
                <Grid container item xs={3} alignItems="center">
                    <Button onClick={handleCalculate} label="Calculate" />
                </Grid>
            </Grid>
        </DialogContent>
    );
};