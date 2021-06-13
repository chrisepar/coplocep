
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

import useStyles from 'styles/core/buttons/_buttons.js';

function RejectButton(props) {
    const classes = useStyles();
    const { id, label, callback, categoryTitle, category, amount, transactionKey } = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);

    const [comment, setComment] = React.useState("");

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        if (callback) {
            callback(transactionKey, comment).then(() => setOpenEntryDialog(false));
        }
    };

    return (
        <div>
            <IconButton aria-label="expand row" size="small"
                onClick={handleClickOpen}>
                <ThumbDownIcon style={{ color: '#FF7961' }} />
            </IconButton>
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reject {category}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Approving {categoryTitle} amounting to {amount}
                    </DialogContentText>
                    <MultilineField id="rejectComment" label="Comment" value={comment} onChange={(value) => setComment(value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleConfirm} color="primary"> Reject </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

RejectButton.defaultProps = {
    callback: null
};

export default RejectButton;