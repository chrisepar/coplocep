import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
import Button from "app/core/button/core_button.js";
import Grid from '@material-ui/core/Grid';
import TextField from 'app/core/fields/text_field.js';

import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import IntPayView from "app/transaction/components/loan/interest_payment_view.js";
import { addPayment, downloadComputation } from 'app/transaction/transaction_model.js';

export default (props) => {
    let { detailID } = useParams();
    const { detail, handleDialogClose } = props;
    const { TransactionKey, Amount, Interest, Term } = detail;
    const [paymentReload, setPaymentReload] = useState(0);

    // useEffect(() => {
    //     let mounted = true;
    //     getMemberTransactionList(detailID, category)
    //         .then(items => {
    //             if (mounted) {
    //                 setList(items)
    //             }
    //             setLoading(false);
    //         })
    //     return () => mounted = false;
    // }, []);
    // End

    const addCallback = (paymentAmount) => {
        return addPayment(detailID, { loanID: TransactionKey, amount: paymentAmount }).then((data) => {
            if (data) {
                setPaymentReload(data);
            }
        });
    };

    const handleCalculate = (event) => {
        downloadComputation(Amount, Interest, Term);
    };


    console.log("Render");
    return (
        <Dialog open={(TransactionKey > 0)} onClose={handleDialogClose} aria-labelledby="form-dialog-title" fullWidth fullScreen maxWidth="lg">
            <DialogTitle id="form-dialog-title">Loan Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} >
                    <Grid item xs={3}>
                        <TextField id="LoanID" label="Loan Number" disabled={true} value={TransactionKey} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="Amount" label="Loan Amount" disabled={true} value={Amount} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="InterestRate" label="Interest Rate" disabled={true} value={Interest} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="Term" label="Term" disabled={true} value={Term} />
                    </Grid>

                    <Grid item xs={12}>
                        <IntPayView paymentReload={paymentReload} loanID={TransactionKey} category="Payment" categoryTitle="Payment" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <EntryButton callback={addCallback} categoryTitle="Payment" category="Payment" customText="Pay an amount" />
                <Button onClick={handleCalculate} label="Calculate" />
                <Button onClick={handleDialogClose} color="primary" label="Close" />
            </DialogActions>
        </Dialog>
    );
};