
import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CurrencyField from 'app/core/fields/currency_field.js';

import useStyles from 'styles/core/buttons/_buttons.js';

function AddButton(props) {
    const classes = useStyles();
    const { id, label, callback, categoryTitle, category} = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);
    
    const [amount, setAmount] = React.useState("");

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        if (callback) {
            callback(amount).then(() => setOpenEntryDialog(false));
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
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{category}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {categoryTitle}
                    </DialogContentText>
                    <CurrencyField id={category} label="Amount" value={amount} onChange={(value) => setAmount(value)}/>
                </DialogContent>
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