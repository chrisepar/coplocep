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
import EntryButton from "app/transaction/components/add_button.js";
import DateField from 'app/core/fields/date_field.js';
import moment from 'moment';

import useTableStyles from 'styles/transaction/components/_transactionTable.js';
import { FormatDateTime } from 'app/core/helpers/date_format.js';

import DeleteButton from "app/transaction/components/delete_button.js";
import ApproveButton from "app/transaction/components/approve_button.js";

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

function TransactionToolbar(props) {
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
                    <EntryButton callback={addCallback} categoryTitle={categoryTitle} category={category} />
                </Grid>
            </Grid>
        </Toolbar>
    );
};

function TransactionTable(props) {
    const classes = useTableStyles();
    const { rows, addCallback, deleteCallback, approveCallback, categoryTitle, category } = props;
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
                                <TableCell >Modified By</TableCell>
                                <TableCell >Modified Date</TableCell>
                                <TableCell >Created By</TableCell>
                                <TableCell >Created Date</TableCell>
                                <TableCell >Approved Date</TableCell>
                                <TableCell >Approved By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <DeleteButton callback={deleteCallback} categoryTitle={categoryTitle} category={category}
                                                transactionKey={row.TransactionKey} amount={row.Amount} />
                                        </TableCell>
                                        <TableCell>
                                            <ApproveButton callback={approveCallback} categoryTitle={categoryTitle} category={category}
                                                transactionKey={row.TransactionKey} amount={row.Amount} />
                                        </TableCell>
                                        <TableCell align="right">{row.Amount}</TableCell>
                                        <TableCell>{row.CreatedBy}</TableCell>
                                        <TableCell>{FormatDateTime(row.CreatedDate)}</TableCell>
                                        <TableCell>{row.ModifiedBy}</TableCell>
                                        <TableCell>{FormatDateTime(row.ModifiedDate)}</TableCell>
                                        <TableCell>{row.ApprovedBy}</TableCell>
                                        <TableCell>{FormatDateTime(row.ApprovedDate)}</TableCell>
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