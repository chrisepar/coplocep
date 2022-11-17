
import React from 'react';
import Grid from '@mui/material/Grid';
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
    const { categoryTitle, category, newTransactData, setNewTransactData,
        status, setStatus, setDialogStatus, dialogStatus, otherOptions } = props;

    const PRINCIPAL_CONSTANT = "Principal";
    const AMOUNT_CONSTANT = "Amount";
    const INTEREST_CONSTANT = "Interest";
    const PENALTY_CONSTANT = "Penalty";

    const getPrincipal = (newDetail, value, field) => {
        switch (field) {
            case AMOUNT_CONSTANT:
                newDetail[PRINCIPAL_CONSTANT] = value - newDetail.Interest - newDetail.Penalty;
                break;
            case INTEREST_CONSTANT:
                newDetail[PRINCIPAL_CONSTANT] = newDetail.Amount - value - newDetail.Penalty;
                break;
            case PENALTY_CONSTANT:
                newDetail[PRINCIPAL_CONSTANT] = newDetail.Amount - newDetail.Interest - value;
                break;
        }
    };

    // Handle Status Close
    const handleStatusClose = () => {
        setStatus(defaultStatus);
    };

    const handleChange = (value, field) => {
        var newDetail = _.clone(newTransactData);
        (field !== PRINCIPAL_CONSTANT) && getPrincipal(newDetail, value, field);
        newDetail[field] = value;
        setNewTransactData(newDetail);
    };

    const outstandingBalanceValue = otherOptions.UnpaidAmount - newTransactData.Principal;

    return (
        <DialogContent>
            <Grid container spacing={3} >
                <Grid item xs={2}>
                    <CurrencyField id={AMOUNT_CONSTANT} label="Amount" value={newTransactData.Amount}
                        onChange={(value) => handleChange(value, AMOUNT_CONSTANT)} allowNegative={true} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={INTEREST_CONSTANT} label="Interest" value={newTransactData.Interest}
                        onChange={(value) => handleChange(value, INTEREST_CONSTANT)} allowNegative={true} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={PENALTY_CONSTANT} label="Penalty" value={newTransactData.Penalty}
                        onChange={(value) => handleChange(value, PENALTY_CONSTANT)} allowNegative={true} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={PRINCIPAL_CONSTANT} label="Principal" value={newTransactData.Principal}
                        onChange={(value) => handleChange(value, PRINCIPAL_CONSTANT)} allowNegative={true} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="OutstandingBalance" label="Outstanding Balance" value={outstandingBalanceValue} disabled={true} allowNegative={true} />
                </Grid>
            </Grid>
        </DialogContent>
    );
};

PaymentDialog.defaultProps = {
    callback: null
};


export default PaymentDialog;