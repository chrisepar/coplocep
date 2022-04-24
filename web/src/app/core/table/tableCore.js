import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory, useLocation } from "react-router-dom";

//Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { useTableStyles } from 'app/core/styles/_table.js';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import TableHeader from "app/core/table/tableHeader.js";
import TableToolbar from "app/core/table/tableToolbar.js";

import FormatValue from "app/core/helpers/format_value.js";
import isEmpty from "app/core/helpers/is_empty.js";

import TablePaginationActions from "app/core/table/tablePagination.js";

//Table
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function dataCell(col, row) {
    return (
        col.map((cell, cellIndex) => (
            <TableCell key={row.MemberKey + "_" + cellIndex} align="left">{FormatValue(cell.type, row[cell.field])}</TableCell>
        ))
    );
}

function TableCore(props) {
    const history = useHistory();
    const classes = useTableStyles();

    const { data, totalRowCount, rowsPerPage, columns, title, editable, page, setPage, 
        filterByValue, setFilterByValue, searchValue, setSearchValue } = props;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEditBtnClick = (event, id) => {
        history.push(history.location.pathname + "/" + id);
    };

    // Compute for Empty Rows
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - totalRowCount);

    return (
        <Paper className={classes.paper}>
            <TableToolbar title={title} searchValue={searchValue} setSearchValue={setSearchValue} filterByList={columns} 
            filterByValue={filterByValue} setFilterByValue={setFilterByValue} />
            <TableContainer>
                <Table
                    aria-label="simple table"
                    stickyHeader
                >
                    <TableHeader
                        classes={classes}
                        rowCount={data.length}
                        columns={columns}
                    />
                    <TableBody>
                        {
                            data.map((row, rowIndex) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.MemberKey}
                                    >
                                        <TableCell>
                                            <IconButton aria-label="expand row" size="small" onClick={(event) => handleEditBtnClick(event, row.MemberKey)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        {dataCell(columns, row)}
                                    </TableRow>
                                );
                            })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 63 * emptyRows }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[rowsPerPage]}
                component="div"
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
        </Paper>
    );
};

TableCore.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

TableCore.defaultProps = {
    title: "",
    rowsPerPage: 5
};

export default TableCore;