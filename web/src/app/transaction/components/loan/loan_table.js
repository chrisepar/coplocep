import React, { useEffect, useState } from 'react';
import _ from 'lodash';


import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import moment from 'moment';

import Dropdown from 'app/core/fields/dropdown_field.js';
import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import { DeleteButton } from "app/transaction/components/common/delete_button.js";
import DateField from 'app/core/fields/date_field.js';

import useStyles from 'app/transaction/styles/components/_transactionTable.js';
import { FormatDateTime, GetDueDateOfCurrentMonth } from 'app/core/helpers/date_format.js';
import { Peso } from 'app/core/helpers/currency_format.js';

import LoanDetails from "app/transaction/components/loan/loan_details.js";
import IsEmpty from "app/core/helpers/is_empty.js";

import TablePaginationActions from "app/core/table/tablePagination.js";

const filterOptions = [
    {
        value: "NoFilter",
        label: "No Filter"
    }, {
        value: "Daily",
        label: "Daily"
    }, {
        value: "Week",
        label: "Weekly"
    }, {
        value: "Month",
        label: "Monthly"
    }, {
        value: "Annual",
        label: "Annually"
    }
];

const LoanToolbar = (props) => {
    const { addCallback, setSetSearchValue, searchValue, setLoading } = props;
    // const [filterBy, setFilterBy] = useState("NoFilter");
    const [fromDateValue, setFromDateValue] = useState();
    const [toDateValue, setToDateValue] = useState();

    const handleFilterChange = (value) => {
        setLoading(true);
        !IsEmpty(setSetSearchValue) && setSetSearchValue(value)
    };

    const handleRemove = (event, transactionKey) => {
        if (deleteEntry) {
            deleteEntry(transactionKey);
        }
    };

    return (
        <Toolbar>
            <Grid container item xs={12} spacing={2} direction="row" alignItems="center">
                <Grid item xs={2}>
                    <Dropdown id="filter_loan_by" label="Filter" list={filterOptions}
                        value={searchValue} onChange={(value) => handleFilterChange(value)} />
                </Grid>
                {/* {
                    (searchValue === "DateRange") ?
                        <Grid container item xs={4} spacing={1} direction="row" alignItems="center" >
                            <Grid item xs={6}>
                                <DateField id="fromDate" label="From" disableFuture={true} />
                            </Grid>
                            <Grid item xs={6} >
                                <DateField id="toDate" label="To" disableFuture={true} />
                            </Grid>
                        </Grid>
                        : null
                } */}
                <Grid item xs />
                <Grid item xs={3} container justifyContent="flex-end">
                    <EntryButton callback={addCallback} categoryTitle="Loan" category="Loan" />
                </Grid>
            </Grid>
        </Toolbar>
    );
};

const LoanTable = (props) => {
    const classes = useStyles();

    const { memberKey, rows, totalRowCount, page, setPage, addCallback, deleteCallback, approveCallback,
        rejectCallback, rowsPerPage, setSetSearchValue, searchValue, setLoading } = props;

    const [selectedLoan, setSelectedLoan] = useState(null);

    // Compute for Empty Rows
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - totalRowCount);

    const handleDetailOpen = (detail) => {
        setSelectedLoan(detail);
    };

    const handleDetailClose = () => {
        setSelectedLoan(null);
    };

    // Pagination
    const handleChangePage = (event, newPage) => {
        setLoading(true);
        setPage(newPage);
    };

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <LoanToolbar addCallback={addCallback} setSetSearchValue={setSetSearchValue} searchValue={searchValue} setLoading={setLoading} />
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        Loan Number
                                    </TableCell>
                                    <TableCell >Next Due Date</TableCell>
                                    <TableCell align="right">Balance</TableCell>
                                    <TableCell align="right">Loan Amount</TableCell>
                                    <TableCell align="right">Interest Rate</TableCell>
                                    <TableCell align="right">Term</TableCell>
                                    <TableCell >Created</TableCell>
                                    <TableCell >Approved</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {
                                                    (row.IsApproved) ?
                                                        <IconButton
                                                            aria-label="more"
                                                            id="loan-details"
                                                            aria-haspopup="true"
                                                            onClick={() => handleDetailOpen(row)}
                                                        >
                                                            <SearchIcon />
                                                        </IconButton>
                                                        :
                                                        <IconButton
                                                            aria-label="more"
                                                            id="loan-approve"
                                                            aria-haspopup="true"
                                                            onClick={() => approveCallback(row.TransactionKey, "Approved Loan Amounting to " + Peso(row.Amount))}
                                                        >
                                                            <ThumbUpAltIcon />
                                                        </IconButton>
                                                }
                                            </TableCell>
                                            <TableCell align="left">{row.TransactionKey}</TableCell>
                                            <TableCell align="left">{GetDueDateOfCurrentMonth(row.StartDueDate)}</TableCell>
                                            <TableCell align="right">{Peso(row.Balance)}</TableCell>
                                            <TableCell align="right">{Peso(row.Amount)}</TableCell>
                                            <TableCell align="right">{row.Interest}</TableCell>
                                            <TableCell align="right">{row.Term}</TableCell>
                                            <TableCell>{row.CreatedBy} - {FormatDateTime(row.CreatedDate)}</TableCell>
                                            <TableCell>{row.ApprovedBy} - {FormatDateTime(row.ApprovedDate)}</TableCell>
                                            <TableCell>
                                                <DeleteButton callback={deleteCallback} categoryTitle="Loan" category="Loan"
                                                    transactionKey={row.TransactionKey} amount={row.Amount} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 81 * emptyRows }}>
                                        <TableCell colSpan={9} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5]}
                                        colSpan={9}
                                        count={totalRowCount}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer >
                </Grid>
            </Grid>
            {!IsEmpty(selectedLoan) && <LoanDetails detail={selectedLoan} handleDialogClose={handleDetailClose} />}
        </React.Fragment>
    );
};

export default LoanTable;