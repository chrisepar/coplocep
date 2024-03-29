import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';


import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import moment from 'moment';

import Dropdown from 'app/core/fields/dropdown_field.js';
import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import { DeleteButton } from "app/transaction/components/common/delete_button.js";
import DateField from 'app/core/fields/date_field.js';

import useStyles from 'app/transaction/styles/components/_transactionTable.js';
import { FormatDateTime } from 'app/core/helpers/date_format.js';
import { Peso } from 'app/core/helpers/currency_format.js';
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


const TransactionToolbar = (props) => {
    const { addCallback, deleteCallback, categoryTitle, category, setSetSearchValue, searchValue, setLoading } = props;
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
                } */}
                <Grid item xs />
                <Grid item xs={3} container justifyContent="flex-end">
                    {
                        (category !== "Interest" && category !== "Payment") && <EntryButton callback={addCallback} categoryTitle={categoryTitle} category={category} />
                    }
                </Grid>
            </Grid>
        </Toolbar>
    );
};

const TransactionTable = (props) => {
    const { classes } = useStyles();

    const DEPOSIT_CONSTANT = "Deposit";
    const PAYMENT_CONSTANT = "Payment";

    const { rows, totalRowCount, page, setPage, addCallback, deleteCallback, categoryTitle, category, rowsPerPage, setSetSearchValue, searchValue, setLoading } = props;

    // Compute for Empty Rows
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - totalRowCount);

    // Pagination
    const handleChangePage = (event, newPage) => {
        setLoading(true);
        setPage(newPage);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <TransactionToolbar addCallback={addCallback} categoryTitle={categoryTitle} category={category} setSetSearchValue={setSetSearchValue} searchValue={searchValue}
                    setLoading={setLoading}
                />
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    {category} Number
                                </TableCell>
                                <TableCell align="right">{category} Amount</TableCell>

                                {(category === DEPOSIT_CONSTANT) && <TableCell align="right">{category} Savings</TableCell>}
                                {(category === DEPOSIT_CONSTANT) && <TableCell align="right">{category} Share Capital Amount</TableCell>}

                                {(category === PAYMENT_CONSTANT) && <TableCell align="right">Interest</TableCell>}
                                {(category === PAYMENT_CONSTANT) && <TableCell align="right">Principal</TableCell>}
                                {(category === PAYMENT_CONSTANT) && <TableCell align="right">Penalty</TableCell>}
                                <TableCell >Created</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{row.TransactionKey}</TableCell>
                                        <TableCell align="right">{Peso(row.Amount)}</TableCell>

                                        {(category === DEPOSIT_CONSTANT) && <TableCell align="right">{Peso(row.DepositSavings)}</TableCell>}
                                        {(category === DEPOSIT_CONSTANT) && <TableCell align="right">{Peso(row.DepositShareCapitalAmount)}</TableCell>}

                                        {(category === PAYMENT_CONSTANT) && <TableCell align="right">{Peso(row.Interest)}</TableCell>}
                                        {(category === PAYMENT_CONSTANT) && <TableCell align="right">{Peso(row.Principal)}</TableCell>}
                                        {(category === PAYMENT_CONSTANT) && <TableCell align="right">{Peso(row.Penalty)}</TableCell>}

                                        <TableCell>{row.CreatedBy} - {FormatDateTime(row.CreatedDate)}</TableCell>
                                        <TableCell>
                                            <DeleteButton callback={deleteCallback} categoryTitle={categoryTitle} category={category}
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
                                    rowsPerPageOptions={[rowsPerPage]}
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
    );
};

export default TransactionTable;