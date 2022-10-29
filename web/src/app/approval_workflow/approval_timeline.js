import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import IsTruthy from "app/core/helpers/is_truthy.js";
import { FormatDateTime } from 'app/core/helpers/date_format.js';

import useStyles from "app/approval_workflow/style/_approvalTimeline.js"

import { getApprovalTimeline } from "app/approval_workflow/approval_workflow_model.js";
import Loading from 'app/core/helpers/loading_screen.js';

const status = {
    Rejected: "Rejected",
    Approved: "Approved"
};

const getStatus = (isApproved) => {
    return IsTruthy(isApproved) ?
        <Typography color="primary">{status.Approved}</Typography>
        : <Typography color="error">{status.Rejected}</Typography>;
};

const ApprovalTimeline = (props) => {
    const { classes } = useStyles();
    const { category, recordID, openDialog, setOpenDialog } = props;
    const [isLoading, setLoading] = useState(true);

    const [list, setList] = useState([]);

    useEffect(() => {
        let mounted = true;
        if (openDialog) {
            getApprovalTimeline(category, recordID)
                .then(data => {
                    if (mounted) {
                        setList(data);
                    }
                    setLoading(false);
                })
        }
        return () => mounted = false;
    }, [openDialog]);

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title"
            fullWidth={true} maxWidth="md">
            <DialogTitle id="form-dialog-title">Approval Timeline</DialogTitle>
            <DialogContent>
                {
                    (isLoading) ? <Loading /> :
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHeadCell} style={{ width: 100 }}>Status</TableCell>
                                        <TableCell className={classes.tableHeadCell} style={{ width: 150 }}>Date</TableCell>
                                        <TableCell className={classes.tableHeadCell}>Comment</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        list.results.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell >
                                                    {getStatus(item.IsApproved)} by {item.ApprovedBy}
                                                </TableCell>
                                                <TableCell >{FormatDateTime(item.ApprovedDate)} </TableCell>
                                                <TableCell >{item.Comment} </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ApprovalTimeline.propTypes = {
    recordID: PropTypes.any.isRequired,
    category: PropTypes.string.isRequired
};

export default ApprovalTimeline;