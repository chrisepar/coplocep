import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory, useLocation } from "react-router-dom";

//Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { useTableStyles } from 'styles/core/_table.js';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import TableHeader from "app/core/table/tableHeader.js";
import TableToolbar from "app/core/table/tableToolbar.js";

import field_types from 'app/core/fields/field_types.js';

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

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function valueEmpty(fieldType, value) {
    if (value === "") {
        switch (fieldType) {
            case field_types.text_field:
                return "";
            case field_types.number_field:
                return 0;
            default:
                return "";
        }
    } else {
        return value;
    }
}

function dataCell(col, row) {
    return (
        col.map((cell, cellIndex) => (
            <TableCell key={row.id + "_" + cellIndex} align="left">{valueEmpty(cell.field, row[cell.field]).toString()}</TableCell>
        ))
    );
}

function getMaxRowsPerPage() {
    return Math.abs(Math.floor((window.innerHeight - 185) / 53)) - 1;
}

function TableCore(props) {
    const history = useHistory();
    const classes = useTableStyles();

    const { data, columns, isMultiSelect, rowsPerPageOptions, title, editable } = props;

    const [order, setOrder] = React.useState('asc');

    const [orderBy, setOrderBy] = React.useState('calories');

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(getMaxRowsPerPage());

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleMultiSelectClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditBtnClick = (event, id) => {
        history.push(history.location.pathname + "/" + id);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const getTotal = (field, row) => {
        var total = 0;
        for (var counter = 0; counter < row.length; counter++) {
            total = total + row[counter][field];
        };
        return total;
    };


    const hasTotalRow = () => {
        for (var counter = 0; counter < columns.length; counter++) {
            if (columns[counter].hasTotal) {
                return true;
            }
        };
        return false;
    }

    const rowForTotal = () => {
        if (hasTotalRow()) {
            return (
                <TableRow hover tabIndex={-1} key="totalRowID" className={classes.tableRow} >
                    <TableCell />
                    {
                        columns.map((col, colIndex) => {
                            if (col.hasTotal) {
                                return (
                                    <TableCell key={"totalRowID" + "_" + colIndex} align="left" className={classes.totalRow}>{getTotal(col.field, data)}</TableCell>
                                );
                            } else {
                                return (
                                    <TableCell />
                                );
                            }
                        })
                    }
                </TableRow>
            );
        } else {
            return null;
        }
    };

    return (
        <Paper className={classes.paper}>
            <TableToolbar title={title} numSelected={selected.length} isMultiSelect={isMultiSelect} />
            <TableContainer className={classes.tableContainer}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size='medium'
                    aria-label="enhanced table"
                    stickyHeader
                >
                    <TableHeader
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        columns={columns}

                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        isMultiSelect={isMultiSelect}
                        editable={editable}

                    />
                    <TableBody className={classes.tableBody}>
                        {
                            stableSort(data, getComparator(order, orderBy))
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, rowIndex) => {
                                    if (isMultiSelect) {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${rowIndex}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleMultiSelectClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                                className={classes.tableRow}
                                            >

                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                {dataCell(columns, row)}
                                            </TableRow>
                                        );
                                    } else {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.id}
                                                className={classes.tableRow}
                                            >
                                                {(editable) ?
                                                    <TableCell>
                                                        <IconButton aria-label="expand row" size="small" onClick={(event) => handleEditBtnClick(event, row.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    : null
                                                }
                                                {dataCell(columns, row)}
                                            </TableRow>
                                        );
                                    }
                                })
                        }

                        {
                            emptyRows > 0 && (
                                <TableRow style={{ height: 53 * (hasTotalRow() ? emptyRows - 1 : emptyRows) }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )
                        }

                        {
                            rowForTotal()
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

TableCore.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

TableCore.defaultProps = {
    rowsPerPageOptions: [],
    title: "",
    isMultiSelect: false,
    rowsPerPageOptions: [],
    editable: false
};

export default TableCore;