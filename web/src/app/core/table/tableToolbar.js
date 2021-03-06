import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useToolbarStyles } from 'styles/core/_table.js';

function TableToolbar(props) {
    const classes = useToolbarStyles();
    const { numSelected, isMultiSelect, title } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: (numSelected > 0 && isMultiSelect),
            })}
        >
            {(numSelected > 0 && isMultiSelect) ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        {title}
                    </Typography>
                )}

            {(numSelected > 0 && isMultiSelect) ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

TableToolbar.defaultProps = {
    title: ""
};

export default TableToolbar;