import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DateField from 'app/core/fields/date_field.js';
import CurrencyField from 'app/core/fields/currency_field.js';
import NumberField from "app/core/fields/number_field.js";
import Loading from 'app/core/helpers/loading_screen.js';
import Button from 'app/core/button/core_button.js';
import StatusBar from "app/core/dialogs/statusbar.js";

import { model, getSettings } from "app/settings/settings_model.js";
import { getMember } from 'app/membership/member_model.js';

import { downloadComputation } from 'app/transaction/transaction_model.js';


export default (props) => {
    let { detailID } = useParams();
    const { categoryTitle, category, setAmount, setInterest, setTerm, setDueDate, amount, interest, term, dueDate, isLoading, setLoading } = props;

    const [settingsDetails, setSettingDetails] = useState(model);

    const defaultStatus = {
        open: false,
        message: "",
        severity: "info"
    };

    const [status, setStatus] = React.useState(defaultStatus);

    // Handle Status Close
    const handleStatusClose = () => {
        setStatus(defaultStatus);
    };

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
                setStatus({
                    open: true,
                    message: "An Error Occured",
                    severity: "error"
                });
            }
            setLoading(false);
        })
        return () => mounted = false;
    }, [])

    const handleCalculate = (event) => {
        setLoading(true);
        downloadComputation(detailID, amount, interest, term).then((fileName) => {
            setLoading(false);
            setStatus({
                open: true,
                message: `Download Successful - ${fileName}`,
                severity: "success"
            });
        }).catch((error) => {
            setStatus({
                open: true,
                message: "Download Failed",
                severity: "error"
            });
        });
    };


    console.log("Render");
    return (
        <DialogContent>
            {(isLoading || isLoading === null) ? <Loading /> : null}
            <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
            <Grid container spacing={3} >
                <Grid item xs={3}>
                    <CurrencyField id={category} label="Amount" value={amount} onChange={(value) => setAmount(value)} />
                </Grid>
                <Grid item xs={2}>
                    <NumberField id="Interest" label="Interest Rate" maxValue={100} fixedDecimalScale
                        value={interest} onChange={(value) => setInterest(value)} />
                </Grid>
                <Grid item xs={2}>
                    <NumberField id="Term" label="Term" decimalScale={0}
                        value={term} onChange={(value) => setTerm(value)} />
                </Grid>
                <Grid item xs={3}>
                    <DateField id="StartDueDate" label="Due Date" openTo="month" views={["year", "month", "date"]}
                        value={dueDate} onChange={(value) => setDueDate(value)} />
                </Grid>
                <Grid container item xs={2} alignItems="center">
                    <Button onClick={handleCalculate} label="Download Breakdown" size="small" disabled={(amount <= 0)} />
                </Grid>
            </Grid>
        </DialogContent>
    );
};