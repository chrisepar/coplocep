
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MultilineField from 'app/core/fields/multiline_field.js';
import CoreButton from 'app/core/button/core_button.js';

import useStyles from 'app/core/styles/buttons/_buttons.js';
import { approveRecord } from "app/approval_workflow/approval_workflow_model.js";

function ApproveButton(props) {
    const { classes } = useStyles();
    const { id, label, callback, memberName, recordID, setReload } = props;
    const [openEntryDialog, setOpenEntryDialog] = React.useState(false);

    const [comment, setComment] = React.useState("");

    const handleClickOpen = () => {
        setOpenEntryDialog(true);
    };

    const handleClose = () => {
        setOpenEntryDialog(false);
    };

    const handleConfirm = () => {
        approveRecord(recordID, "Membership", comment).then((data) => {
            if (data) {
                setReload && setReload(true);
            }
        }).then(() => setOpenEntryDialog(false));
    };

    return (
        <div>
            <CoreButton label="Approve" onClick={handleClickOpen} />
            <Dialog open={openEntryDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Approve membership</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to approve {memberName}'s membership?
                    </DialogContentText>
                    <MultilineField id="approveComment" label="Comment" value={comment} onChange={(value) => setComment(value)} />
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
    setReload: null
};

export default ApproveButton;