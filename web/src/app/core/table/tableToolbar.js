import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import { debounce } from 'throttle-debounce';

import { useToolbarStyles } from 'app/core/styles/_table.js';

function TableToolbar(props) {
    const classes = useToolbarStyles();
    const { numSelected, isMultiSelect, title, searchPlaceHolder, setSearchValue, searchValue } = props;

    const searchDebounce = debounce(750, true, (e) => {
        setTimeout(() => {
            setSearchValue(e.target.value);
        }, 1200);
    });

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: (numSelected > 0 && isMultiSelect),
            })}
        >
            <TextField id="table-search" placeholder={searchPlaceHolder} type="search" variant="outlined" size="small"
                onChange={(e) => searchDebounce(e)} />
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

TableToolbar.defaultProps = {
    title: "",
    searchPlaceHolder: "Search Member",
};

export default TableToolbar;