
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
import StandardContent from "app/transaction/components/new_transaction/standard_content.js";

import { downloadComputation } from 'app/transaction/transaction_model.js';

function AddButton(props) {
    let { detailID } = useParams();
    const { classes } = useStyles();
    const { id, label, callback, categoryTitle, category, customText } = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);

    const newTransactionModel = {
        amount: 0, interest: 0, term: 0, typeOfLoan: "", dueDate: null,
        serviceFee: 0, insuranceAmount: 0, fixedDepositAmount: 0, documentationAmount: 0, 
        savingsDepositAmount: 0, balancePreviousLoanAmount: 0, interestPreviousLoanAmount: 0
    };
    
    const [newTransactData, setNewTransactData] = React.useState(newTransactionModel);

    const [isLoading, setLoading] = React.useState(null);

    const defaultStatus = {
        open: false,
        message: "",
        severity: "info"
    };

    const [status, setStatus] = React.useState(defaultStatus);

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        if (callback) {
            setLoading(true);
            callback(newTransactData).then(() => {
                setOpenEntryDialog(false);
            });
        }
    };    

    const handleCalculate = (event) => {
        setLoading(true);
        downloadComputation(detailID, newTransactData.amount, newTransactData.interest, newTransactData.term).then((fileName) => {
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

    const breakdown = () => {
        switch (category) {
            case "Loan":
                return <LoanBreakdown categoryTitle={categoryTitle} category={category} isLoading={isLoading} setLoading={setLoading}
                    newTransactData={newTransactData} setNewTransactData={setNewTransactData} status={status} setStatus={setStatus}
                />;
            default:
                return <StandardContent categoryTitle={categoryTitle} category={category} isLoading={isLoading} setLoading={setLoading}
                    newTransactData={newTransactData} setNewTransactData={setNewTransactData}  status={status} setStatus={setStatus}
                />;
        }
    };

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
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl" fullWidth>
                <DialogTitle id="form-dialog-title">{category}</DialogTitle>
                {
                    breakdown()
                }
                <DialogActions>
                    <Button onClick={handleCalculate} color="primary" disabled={(newTransactData.amount <= 0)} > Download Breakdown </Button>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleConfirm} color="primary" disabled={(newTransactData.amount <= 0)}> Confirm </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

AddButton.defaultProps = {
    callback: null,
    customText: null
};

export default AddButton;