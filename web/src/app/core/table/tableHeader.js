import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { isNull } from 'lodash';

function TableHeader(props) {
    const { classes, order, orderBy, onRequestSort, columns } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className={classes.tableRow}>
                <TableCell />
                {columns.map((item) => (
                    <TableCell
                        key={item.field}
                        align='left'
                        padding='normal'// {columns.disablePadding ? 'none' : 'normal'}
                        // sortDirection={orderBy === item.field ? order : false}
                    >
                        {/* <TableSortLabel
                            active={orderBy === item.field}
                            direction={orderBy === item.field ? order : 'asc'}
                            onClick={createSortHandler(item.field)}
                        > */}
                            <div className={classes.colHeaderContainer} style={{ width: (item.width) ? item.width : "100px" }}>
                                {item.headerName}
                            </div>
                            {/* {orderBy === item.field ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null} */}
                        {/* </TableSortLabel> */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

TableHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    // onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    // orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columns: PropTypes.array.isRequired
};

TableHeader.defaultProps = {
    disablePadding: false,
    editable: false
};

export default TableHeader;