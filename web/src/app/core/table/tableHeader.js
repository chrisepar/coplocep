import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { isNull } from 'lodash';

function TableHeader(props) {
    const { classes, order, orderBy, onRequestSort, columns, hasDelete } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow className={classes.tableRow}>
                <TableCell />
                { (hasDelete) && <TableCell /> }
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