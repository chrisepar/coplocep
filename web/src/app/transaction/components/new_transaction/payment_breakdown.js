
import React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CurrencyField from 'app/core/fields/currency_field.js';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function PaymentDialog(props) {
    const { id, label, openDialog, handleDialogClose, setOpenDialog, callback, categoryTitle, category, amount, transactionKey } = props;

    const [paymentAmount, setPaymentAmount] = React.useState(0);

    // useEffect(() => {
    //     let mounted = true;
    //     getMemberTransactionList(detailID, "Loan")
    //         .then(items => {
    //             if (mounted) {
    //                 setLoanList(items)
    //             }
    //             setLoading(false);
    //         })
    //     return () => mounted = false;
    // }, [])

    const handleConfirm = () => {
        if (callback) {
            callback(transactionKey, paymentAmount).then(() => setOpenDialog(0));
        }
    };

    return (
        <Dialog open={openDialog === 4} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{categoryTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Amount to pay {amount}
                </DialogContentText>
                <CurrencyField id={category} label="Amount" value={paymentAmount} onChange={(value) => setPaymentAmount(value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary"> Cancel </Button>
                <Button onClick={handleConfirm} color="primary"> Confirm </Button>
            </DialogActions>
        </Dialog>
    );
};

PaymentDialog.defaultProps = {
    callback: null
};


export default PaymentDialog;