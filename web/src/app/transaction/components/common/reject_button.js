
import React from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MultilineField from 'app/core/fields/multiline_field.js';
import IconButton from '@material-ui/core/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import useStyles from 'app/core/styles/buttons/_buttons.js';

function RejectButton(props) {
    const classes = useStyles();
    const { id, label, openDialog, handleDialogClose, setOpenDialog, callback, categoryTitle, category, amount, transactionKey } = props;

    const [comment, setComment] = React.useState("");

    const handleConfirm = () => {
        if (callback) {
            callback(transactionKey, comment).then(() => setOpenDialog(0));
        }
    };

    return (
        <Dialog open={openDialog === 2} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Reject {category}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Approving {categoryTitle} amounting to {amount}
                </DialogContentText>
                <MultilineField id="rejectComment" label="Comment" value={comment} onChange={(value) => setComment(value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color="primary"> Cancel </Button>
                <Button onClick={handleConfirm} color="primary"> Reject </Button>
            </DialogActions>
        </Dialog>
    );
};

RejectButton.defaultProps = {
    callback: null
};

export default RejectButton;