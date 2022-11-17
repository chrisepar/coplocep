
import React from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import isTruthy from "app/core/helpers/is_truthy.js";

import ApproveDialog from "app/transaction/components/common/approve_button.js";
import RejectDialog from "app/transaction/components/common/reject_button.js";
import PaymentDialog from "app/transaction/components/new_transaction/payment_breakdown.js";

function Test() {
    return (
        <MenuItem key="addTest" >
            ADd  Add
        </MenuItem>
    );
}

function ToolButton(props) {
    const { category, categoryTitle, row, deleteCallback, approveCallback, rejectCallback } = props;
    const [openDialog, setOpenDialog] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleToolOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleToolClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = (open) => {
        setAnchorEl(null);
        setOpenDialog(open);
    };

    const handleDialogClose = () => {
        setOpenDialog(0);
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="more"
                id="loan-tools"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToolOpen}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="loan-tools-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleToolClose}
            >
                {
                    (category === "Loan") && (isTruthy(row.IsApproved)) &&
                    <MenuItem key="payItem" onClick={() => handleDialogOpen(4)}>
                        Pay {category}
                    </MenuItem>
                }
                {
                    (category === "Loan") && (!isTruthy(row.IsApproved)) &&
                    <MenuItem key="approveItem" onClick={() => handleDialogOpen(1)}>
                        Approve {category}
                    </MenuItem>
                }
                {
                    (category === "Loan") && (!isTruthy(row.IsApproved)) &&
                    <MenuItem key="rejectItem" onClick={() => handleDialogOpen(2)}>
                        Reject {category}
                    </MenuItem>
                }
                {
                    (category !== "Payment") && (category !== "Interest") &&
                    <MenuItem key="deleteItem" onClick={() => handleDialogOpen(3)}>
                        Delete {category}
                    </MenuItem>
                }
            </Menu>
            {
                (category === "Loan") && (!isTruthy(row.IsApproved)) &&
                <React.Fragment>
                    <ApproveDialog openDialog={openDialog} setOpenDialog={setOpenDialog} handleDialogClose={handleDialogClose} callback={approveCallback} categoryTitle={categoryTitle} category={category}
                        transactionKey={row.TransactionKey} amount={row.Amount} />
                    <RejectDialog openDialog={openDialog} setOpenDialog={setOpenDialog} handleDialogClose={handleDialogClose} callback={rejectCallback} categoryTitle={categoryTitle} category={category}
                        transactionKey={row.TransactionKey} amount={row.Amount} />
                </React.Fragment>
            }
            {/* {
                (category === "Loan") && (isTruthy(row.IsApproved)) &&
                <PaymentDialog openDialog={openDialog} setOpenDialog={setOpenDialog} handleDialogClose={handleDialogClose} callback={deleteCallback} categoryTitle={categoryTitle} category={category}
                    transactionKey={row.TransactionKey} amount={row.Amount} />
            } */}
            {
                (category !== "Payment") && (category !== "Interest") &&
                <DeleteDialog openDialog={openDialog} setOpenDialog={setOpenDialog} handleDialogClose={handleDialogClose} callback={deleteCallback} categoryTitle={categoryTitle} category={category}
                    transactionKey={row.TransactionKey} amount={row.Amount} />
            }
        </React.Fragment>
    );
};

export default ToolButton;