
import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CurrencyField from 'app/core/fields/currency_field.js';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import useStyles from 'styles/core/buttons/_buttons.js';

function ApproveButton(props) {
    const classes = useStyles();
    const { id, label, callback, categoryTitle, category, amount, transactionKey } = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        if (callback) {
            callback(transactionKey).then(() => setOpenEntryDialog(false));
        }
    };

    return (
        <div>
            <IconButton aria-label="expand row" size="small"
                onClick={handleClickOpen}>
                <ThumbUpIcon style={{ color: 'green' }} />
            </IconButton>
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Approve {category}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Approving {categoryTitle} amounting to {amount}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleConfirm} color="primary"> Approve </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ApproveButton.defaultProps = {
    callback: null
};

export default ApproveButton;