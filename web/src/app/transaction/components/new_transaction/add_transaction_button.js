
import React from 'react';
import {
    useParams
} from "react-router-dom";
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import useStyles from 'app/core/styles/buttons/_buttons.js';
import isEmpty from "app/core/helpers/is_empty.js";

import LoanBreakdown from "app/transaction/components/new_transaction/loan_breakdown.js";
import DepositBreakdown from "app/transaction/components/new_transaction/deposit_breakdown.js";
import StandardContent from "app/transaction/components/new_transaction/standard_content.js";
import PaymentBreakdown from "app/transaction/components/new_transaction/payment_breakdown.js";

import { downloadComputation } from 'app/transaction/transaction_model.js';

function AddButton(props) {
    let { detailID } = useParams();
    const { classes } = useStyles();
    const { id, label, callback, categoryTitle, category, customText, otherOptions } = props;

    const LOAN_CONSTANT = "Loan";
    const DEPOSIT_CONSTANT = "Deposit";
    const PAYMENT_CONSTANT = "Payment";

    const newTransactionModel = {
        Amount: 0, Interest: 0, Term: 0, TypeOfLoan: "", StartDueDate: null,
        ServiceFee: 0, InsuranceAmount: 0, FixedDepositAmount: 0, DocumentationAmount: 0,
        SavingsDepositAmount: 0, BalancePreviousLoanAmount: 0, InterestPreviousLoanAmount: 0,
        DepositSavings: 0, DepositShareCapitalAmount: 0, Principal: 0, Penalty: 0
    };

    const defaultStatus = {
        open: false,
        message: "",
        severity: "info"
    };

    const [status, setStatus] = React.useState(defaultStatus);

    const [newTransactData, setNewTransactData] = React.useState(newTransactionModel);

    const [dialogStatus, setDialogStatus] = React.useState({
        isLoading: null,
        openEntryDialog: false
    });

    const handleClickOpen = () => {
        setDialogStatus({
            ...dialogStatus,
            openEntryDialog: true
        });
    };

    const handleClose = () => {
        setDialogStatus({
            ...dialogStatus,
            openEntryDialog: false
        });
    };

    const handleConfirm = () => {
        if (callback) {
            setDialogStatus({
                ...dialogStatus,
                isLoading: true
            });
            callback(newTransactData).then(() => {
                setDialogStatus({
                    isLoading: false,
                    openEntryDialog: false
                });
            });
        }
    };

    const handleCalculate = (event) => {
        setDialogStatus({
            ...dialogStatus,
            isLoading: true
        });
        downloadComputation(detailID, newTransactData).then((fileName) => {
            setDialogStatus({
                ...dialogStatus,
                isLoading: false
            });
        }).catch((error) => {
            setDialogStatus({
                ...dialogStatus,
                isLoading: false
            });
        });
    };

    const breakdown = () => {
        switch (category) {
            case LOAN_CONSTANT:
                return <LoanBreakdown categoryTitle={categoryTitle} category={category} isLoading={dialogStatus.isLoading} status={status} setStatus={setStatus}
                    newTransactData={newTransactData} setNewTransactData={setNewTransactData} setDialogStatus={setDialogStatus} dialogStatus={dialogStatus}
                />;
            case DEPOSIT_CONSTANT:
                return <DepositBreakdown categoryTitle={categoryTitle} category={category} isLoading={dialogStatus.isLoading} status={status} setStatus={setStatus}
                    newTransactData={newTransactData} setNewTransactData={setNewTransactData} setDialogStatus={setDialogStatus} dialogStatus={dialogStatus}
                />;
            case PAYMENT_CONSTANT:
                return <PaymentBreakdown categoryTitle={categoryTitle} category={category} isLoading={dialogStatus.isLoading} status={status} setStatus={setStatus}
                    newTransactData={newTransactData} setNewTransactData={setNewTransactData} setDialogStatus={setDialogStatus} dialogStatus={dialogStatus}
                    otherOptions={otherOptions}
                />;
            default:
                return <StandardContent categoryTitle={categoryTitle} category={category} isLoading={dialogStatus.isLoading} status={status} setStatus={setStatus}
                    newTransactData={newTransactData} setNewTransactData={setNewTransactData} setDialogStatus={setDialogStatus} dialogStatus={dialogStatus}
                />;
        }
    };

    const isButtonsDisabled = (newTransactData.Amount <= 0 || isEmpty(newTransactData.StartDueDate));

    return (
        <div>
            <Button
                id={id} label={label}
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<AddCircleIcon />}
                onClick={handleClickOpen}
            >{isEmpty(customText) ? category : customText}</Button>
            <Dialog open={dialogStatus.openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl" fullWidth={(category === LOAN_CONSTANT)}>
                <DialogTitle id="form-dialog-title">{category}</DialogTitle>
                {breakdown()}
                <DialogActions>
                    {(category === LOAN_CONSTANT) && <Button onClick={handleCalculate} color="primary" disabled={isButtonsDisabled} > Download Breakdown </Button>}
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleConfirm} color="primary" disabled={(newTransactData.Amount <= 0)}> Confirm </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

AddButton.defaultProps = {
    callback: null,
    customText: null,
    otherOptions: {}
};

export default AddButton;