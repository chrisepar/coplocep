
import React from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MultilineField from 'app/core/fields/multiline_field.js';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import useStyles from 'app/core/styles/buttons/_buttons.js';

function ApproveButton(props) {
    const { classes } = useStyles();
    const { id, label, openDialog, handleDialogClose, setOpenDialog, callback, categoryTitle, category, amount, transactionKey } = props;

    const [comment, setComment] = React.useState("");

    const handleConfirm = () => {
        if (callback) {
            callback(transactionKey, comment).then(() => setOpenDialog(0));
        }
    };

    return (
        <Dialog open={openDialog === 1} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Approve {category}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Approving {categoryTitle} amounting to {amount}
                </DialogContentText>
                <MultilineField id="approveComment" label="Comment" value={comment} onChange={(value) => setComment(value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary"> Cancel </Button>
                <Button onClick={handleConfirm} color="primary"> Approve </Button>
            </DialogActions>
        </Dialog>
    );
};

ApproveButton.defaultProps = {
    callback: null
};

export default ApproveButton;