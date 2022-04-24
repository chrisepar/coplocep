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
import moment from 'moment';

import Dropdown from 'app/core/fields/dropdown_field.js';
import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import { DeleteButton } from "app/transaction/components/common/delete_button.js";
import DateField from 'app/core/fields/date_field.js';

import useStyles from 'app/transaction/styles/components/_transactionTable.js';
import { FormatDateTime } from 'app/core/helpers/date_format.js';

import LoanDetails from "app/transaction/components/loan/loan_details.js";
import IsEmpty from "app/core/helpers/is_empty.js";

import TablePaginationActions from "app/core/table/tablePagination.js";

const filterOptions = [
    {
        value: "NoFilter",
        label: "No Filter"
    }, {
        value: "Annual",
        label: "Annually"
    }, {
        value: "SemiAnnual",
        label: "Semi-Annually"
    }, {
        value: "Quarter",
        label: "Quarterly"
    }, {
        value: "DateRange",
        label: "Date Range"
    }
];

const LoanToolbar = (props) => {
    const { addCallback, deleteCallback } = props;
    const [filterBy, setFilterBy] = useState("NoFilter");
    const [fromDateValue, setFromDateValue] = useState();
    const [toDateValue, setToDateValue] = useState();

    const handleFilterChange = (value) => {
        setFilterBy(value);
    };

    const handleFromDateChange = () => {

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
                        value={filterBy} onChange={(value) => handleFilterChange(value)} />
                </Grid>
                {
                    (filterBy === "DateRange") ?
                        <Grid container item xs={4} spacing={1} direction="row" alignItems="center" >
                            <Grid item xs={6}>
                                <DateField id="fromDate" label="From" disableFuture={true} />
                            </Grid>
                            <Grid item xs={6} >
                                <DateField id="toDate" label="To" disableFuture={true} />
                            </Grid>
                        </Grid>
                        : null
                }
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
    
    const rowsPerPage = 5;

    const { rows, totalRowCount, page, setPage, addCallback, deleteCallback, approveCallback, rejectCallback } = props;

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
        setPage(newPage);
    };

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <LoanToolbar addCallback={addCallback} />
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell align="right">
                                        Loan Number
                                    </TableCell>
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
                                                <IconButton
                                                    aria-label="more"
                                                    id="loan-details"
                                                    aria-haspopup="true"
                                                    onClick={() => handleDetailOpen(row)}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="right">{row.TransactionKey}</TableCell>
                                            <TableCell align="right">{row.Amount}</TableCell>
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
                                        rowsPerPage={5}
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