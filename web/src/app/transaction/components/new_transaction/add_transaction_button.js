
import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import useStyles from 'app/core/styles/buttons/_buttons.js';

import LoanBreakdown from "app/transaction/components/new_transaction/loan_breakdown.js";
import StandardContent from "app/transaction/components/new_transaction/standard_content.js";

function AddButton(props) {
    const classes = useStyles();
    const { id, label, callback, categoryTitle, category } = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);

    const [amount, setAmount] = React.useState(null);
    const [interest, setInterest] = React.useState(null);
    const [term, setTerm] = React.useState(null);

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        if (callback) {
            callback(amount, interest, term).then(() => setOpenEntryDialog(false));
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
            >{category}</Button>
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
                <DialogTitle id="form-dialog-title">{category}</DialogTitle>
                {
                    (category === "Loan") ?
                        <LoanBreakdown categoryTitle={categoryTitle} category={category} amount={amount} setAmount={setAmount}
                            interest={interest} setInterest={setInterest} term={term} setTerm={setTerm}
                        />
                        :
                        <StandardContent categoryTitle={categoryTitle} category={category} amount={amount} setAmount={setAmount} />
                }
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleConfirm} color="primary"> Confirm </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

AddButton.defaultProps = {
    callback: null
};

export default AddButton;