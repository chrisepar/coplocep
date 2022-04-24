import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';


import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import moment from 'moment';

import Dropdown from 'app/core/fields/dropdown_field.js';
import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import { DeleteButton } from "app/transaction/components/common/delete_button.js";
import DateField from 'app/core/fields/date_field.js';

import useStyles from 'app/transaction/styles/components/_transactionTable.js';
import { FormatDateTime } from 'app/core/helpers/date_format.js';

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

const TransactionToolbar = (props) => {
    const { addCallback, deleteCallback, categoryTitle, category } = props;
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
                    {
                        (category !== "Interest" && category !== "Payment") && <EntryButton callback={addCallback} categoryTitle={categoryTitle} category={category} />
                    }
                </Grid>
            </Grid>
        </Toolbar>
    );
};

const TransactionTable = (props) => {
    const classes = useStyles();

    const rowsPerPage = 5;

    const { rows, totalRowCount, page, setPage, addCallback, deleteCallback, categoryTitle, category } = props;

    // Compute for Empty Rows
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - totalRowCount);

    // Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <TransactionToolbar addCallback={addCallback} categoryTitle={categoryTitle} category={category} />
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    {category} Number
                                </TableCell>
                                <TableCell align="right">{category} Amount</TableCell>
                                <TableCell >Created</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="right">{row.TransactionKey}</TableCell>
                                        <TableCell align="right">{row.Amount}</TableCell>
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