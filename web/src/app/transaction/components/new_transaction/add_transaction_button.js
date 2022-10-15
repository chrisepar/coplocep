
import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from 'app/core/styles/buttons/_buttons.js';
import isEmpty from "app/core/helpers/is_empty.js";

import LoanBreakdown from "app/transaction/components/new_transaction/loan_breakdown.js";
import StandardContent from "app/transaction/components/new_transaction/standard_content.js";

function AddButton(props) {
    const classes = useStyles();
    const { id, label, callback, categoryTitle, category, customText } = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);

    const [amount, setAmount] = React.useState(0);
    const [interest, setInterest] = React.useState(null);
    const [term, setTerm] = React.useState(null);
    const [dueDate, setDueDate] = React.useState(new Date());

    const [isLoading, setLoading] = React.useState(null);

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        if (callback) {
            setLoading(true);
            callback(amount, interest, term, dueDate).then(() => {
                setOpenEntryDialog(false);
            });
        }
    };

    const breakdown = () => {
        switch (category) {
            case "Loan":
                return <LoanBreakdown categoryTitle={categoryTitle} category={category} amount={amount} setAmount={setAmount}
                    interest={interest} setInterest={setInterest} term={term} setTerm={setTerm} dueDate={dueDate} setDueDate={setDueDate} 
                    isLoading={isLoading} setLoading={setLoading}
                />;
            default:
                return <StandardContent categoryTitle={categoryTitle} category={category} amount={amount} setAmount={setAmount}
                    isLoading={isLoading} setLoading={setLoading}
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
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
                <DialogTitle id="form-dialog-title">{category}</DialogTitle>
                {
                    breakdown()
                }
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleConfirm} color="primary" disabled={(amount <= 0)}> Confirm </Button>
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