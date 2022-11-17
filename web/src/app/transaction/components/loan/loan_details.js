import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from 'app/core/helpers/loading_screen.js';
// import Button from '@mui/material/Button';
import Button from "app/core/button/core_button.js";
import Grid from '@mui/material/Grid';
import TextField from 'app/core/fields/text_field.js';

import { Peso } from 'app/core/helpers/currency_format.js';
import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import IntPayView from "app/transaction/components/loan/interest_payment_view.js";
import { addPayment, downloadComputation, getLoanPaymentDetails } from 'app/transaction/transaction_model.js';
import StatusBar from "app/core/dialogs/statusbar.js";

export default (props) => {
    let { detailID } = useParams();
    const loanPaymentDetails = {
        PaidAmount: 0, UnpaidAmount: 0
    };

    const { detail, handleDialogClose } = props;
    const { TransactionKey, Amount, Interest, Term } = detail;
    const [paymentReload, setPaymentReload] = useState(0);
    const [details, setDetails] = useState(loanPaymentDetails);

    const [isLoading, setLoading] = React.useState(null);
    const [trigger, setTrigger] = useState(0);

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

    const addCallback = (paymentData) => {
        setLoading(true);
        return addPayment(detailID, {
            ...paymentData,
            loanID: TransactionKey
        }).then((data) => {
            if (data) {
                setStatus({
                    open: true,
                    message: "Payment successfully added!",
                    severity: "success"
                });
                setTrigger(data);
                setPaymentReload(data);
            } else {
                setStatus({
                    open: true,
                    message: "An error occured",
                    severity: "error"
                });
            }
            setLoading(false);
        }, (error) => {
            setStatus({
                open: true,
                message: "An error occured",
                severity: "error"
            });
            setLoading(false);
        });
    };

    const handleCalculate = (event) => {
        setLoading(true);
        downloadComputation(detailID, detail).then((fileName) => {
            setStatus({
                open: true,
                message: `Download Successful - ${fileName}`,
                severity: "success"
            });
            setLoading(false);
        }).catch((error) => {
            setStatus({
                open: true,
                message: "Download Failed",
                severity: "error"
            });
            setLoading(false);
        });
    };

    useEffect(() => {
        let mounted = true;
        getLoanPaymentDetails(TransactionKey)
            .then(data => {
                if (data && data.results.length > 0) {
                    if (mounted) {
                        setDetails(data.results[0]);
                    }
                }
                setTrigger(0);
                setLoading(false);
            })
        return () => mounted = false;
    }, [trigger]);

    console.log("Render");
    return (
        <React.Fragment>
            {(isLoading || isLoading === null) ? <Loading /> : null}
            <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
            <Dialog open={(TransactionKey > 0)} onClose={handleDialogClose} aria-labelledby="form-dialog-title" fullWidth fullScreen maxWidth="lg">
                <DialogTitle id="form-dialog-title">Loan Details</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3} >
                        <Grid item xs={2}>
                            <TextField id="LoanID" label="Loan Number" disabled={true} value={TransactionKey} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="InterestRate" label="Interest Rate" disabled={true} value={Interest} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="Term" label="Term" disabled={true} value={Term} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="Amount" label="Loan Amount" disabled={true} value={Peso(details.LoanAmount)} />
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={6} />

                        <Grid item xs={2}>
                            <TextField id="UnpaidAmount" label="Outstanding Balance" disabled={true} value={Peso(details.UnpaidAmount)} />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField id="PaidAmount" label="Total Paid" disabled={true} value={Peso(details.PaidAmount)} />
                        </Grid>
                        <Grid item xs={2} />

                        <Grid item xs={12}>
                            <IntPayView paymentReload={paymentReload} loanID={TransactionKey} category="Payment" categoryTitle="Payment" setLoanPaymentTrigger={setTrigger} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <EntryButton callback={addCallback} categoryTitle="Payment" category="Payment" customText="Pay an amount"
                        otherOptions={{ UnpaidAmount: details.UnpaidAmount }} />
                    <Button onClick={handleCalculate} label="Download Breakdown" />
                    <Button onClick={handleDialogClose} color="primary" label="Close" />
                </DialogActions>
            </Dialog >
        </React.Fragment >
    );
};