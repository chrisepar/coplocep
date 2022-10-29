
import React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CurrencyField from 'app/core/fields/currency_field.js';
// import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Peso } from 'app/core/helpers/currency_format.js';

import useStyles from 'app/core/styles/buttons/_buttons.js';

function DeleteDialog(props) {
    const { classes } = useStyles();
    const { id, label, openDialog, setOpenDialog, callback, categoryTitle, category, amount, transactionKey } = props;

    const handleConfirm = () => {
        if (callback) {
            callback(transactionKey).then(() => setOpenDialog(false));
        }
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Delete {category}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {(amount) ?
                        `Delete ${categoryTitle} amounting to ${Peso(amount)}`
                        :
                        `Delete ${category}: ${categoryTitle}`
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary"> Cancel </Button>
                <Button onClick={handleConfirm} color="primary"> Confirm </Button>
            </DialogActions>
        </Dialog>
    );
};

DeleteDialog.defaultProps = {
    callback: null
};

function DeleteButton(props) {
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDeleteOpen = () => {
        setOpenDialog(true);
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="more"
                id="delete-button"
                aria-haspopup="true"
                onClick={handleDeleteOpen}
            >
                <DeleteForeverIcon />
            </IconButton>
            <DeleteDialog {...props} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </React.Fragment>
    );
};

export {
    DeleteDialog,
    DeleteButton
};