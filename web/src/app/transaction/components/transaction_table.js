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
import Dropdown from 'app/core/fields/dropdown_field.js';
import EntryButton from "app/transaction/components/new_transaction/add_transaction_button.js";
import DateField from 'app/core/fields/date_field.js';
import moment from 'moment';

import useStyles from 'app/transaction/styles/components/_transactionTable.js';
import { FormatDateTime } from 'app/core/helpers/date_format.js';
import isTruthy from "app/core/helpers/is_truthy.js";

import DeleteButton from "app/transaction/components/delete_button.js";
import ApproveButton from "app/transaction/components/approve_button.js";
import RejectButton from "app/transaction/components/reject_button.js";

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
                <Grid item xs={3} container justify="flex-end">
                    {
                        (category !== "Interest") && <EntryButton callback={addCallback} categoryTitle={categoryTitle} category={category} />
                    }                    
                </Grid>
            </Grid>
        </Toolbar>
    );
};

const TransactionTable = (props) => {
    const classes = useStyles();
    const { rows, addCallback, deleteCallback, approveCallback, rejectCallback, categoryTitle, category } = props;
    return (
        <Grid container>
            <Grid item xs={12}>
                <TransactionToolbar addCallback={addCallback} categoryTitle={categoryTitle} category={category} />
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell />
                                <TableCell align="right">Loan Amount</TableCell>
                                {(category === "Loan") ?
                                    <React.Fragment>
                                        <TableCell align="right">Interest Rate</TableCell>
                                        <TableCell align="right">Term</TableCell>
                                    </React.Fragment>
                                    : null
                                }
                                <TableCell >Created</TableCell>
                                <TableCell >Approved</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell >
                                            {
                                                <RejectButton callback={rejectCallback} categoryTitle={categoryTitle} category={category}
                                                    transactionKey={row.TransactionKey} amount={row.Amount} />

                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                (!isTruthy(row.IsApproved)) && <ApproveButton callback={approveCallback} categoryTitle={categoryTitle} category={category}
                                                    transactionKey={row.TransactionKey} amount={row.Amount} />

                                            }
                                        </TableCell>
                                        <TableCell align="right">{row.Amount}</TableCell>
                                        {(category === "Loan") ?
                                            <React.Fragment>
                                                <TableCell align="right">{row.Interest}</TableCell>
                                                <TableCell align="right">{row.Term}</TableCell>
                                            </React.Fragment>
                                            : null
                                        }
                                        <TableCell>{row.CreatedBy} - {FormatDateTime(row.CreatedDate)}</TableCell>
                                        <TableCell>{row.ApprovedBy} - {FormatDateTime(row.ApprovedDate)}</TableCell>
                                        <TableCell>
                                            <DeleteButton callback={deleteCallback} categoryTitle={categoryTitle} category={category}
                                                transactionKey={row.TransactionKey} amount={row.Amount} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
            </Grid>
        </Grid>
    );
};

export default TransactionTable;