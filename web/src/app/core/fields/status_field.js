import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'app/core/styles/fields/_formControl.js';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IsEmpty from "app/core/helpers/is_empty.js";
import IsTruthy from "app/core/helpers/is_truthy.js";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/More';
import InputAdornment from '@mui/material/InputAdornment';

import ApprovalTimeline from "app/approval_workflow/approval_timeline.js";

const status = {
    NotStarted: "Not Started",
    InProgress: "In Progress",
    Rejected: "Rejected",
    Approved: "Approved"
};

const getStatus = (LastIsApproved, IsFinalApproved) => {
    if (IsEmpty(LastIsApproved)) {
        return status.NotStarted;
    } else if (!IsTruthy(LastIsApproved)) {
        return status.Rejected;
    } else if (IsTruthy(LastIsApproved) && IsTruthy(IsFinalApproved)) {
        return status.Approved;
    }
    return status.InProgress;
};

const StatusField = (props) => {
    const { classes } = useStyles();
    const { id, label, category, recordID, LastIsApproved, IsFinalApproved } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const onLinkClick = () => {
        (getStatus(LastIsApproved, IsFinalApproved) !== status.NotStarted) && setOpenDialog(true)
    };

    return (
        <div>
            <TextField variant="outlined" margin="normal" fullWidth disabled
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: classes.labelRoot
                    }
                }}
                label="Status" value={getStatus(LastIsApproved, IsFinalApproved)}

                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="more"
                                id="loan-details"
                                aria-haspopup="true"
                                onClick={() => onLinkClick()}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </InputAdornment>

                }}
            />
            <ApprovalTimeline category={category} recordID={recordID} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
    );
};

StatusField.propTypes = {
    recordID: PropTypes.any.isRequired,
    category: PropTypes.string.isRequired
};

export default StatusField;