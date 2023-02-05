import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { debounce } from 'throttle-debounce';

import isEmpty from "app/core/helpers/is_empty.js";
import Dropdown from 'app/core/fields/dropdown_field.js';
import { useToolbarStyles } from 'app/core/styles/_table.js';

function TableToolbar(props) {
    const classes = useToolbarStyles();
    const { title, searchPlaceHolder, setSearchValue, searchValue, filterByList, filterByValue, setFilterByValue } = props;

    const searchDebounce = debounce(750, true, (e) => {
        setTimeout(() => {
            !isEmpty(setSearchValue) && setSearchValue(e.target.value);
        }, 1200);
    });

    const handleFilterByChange = (value) => {
        !isEmpty(setFilterByValue) && setFilterByValue(value);
    };

    const handleDownload = () => {
        
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: false//(numSelected > 0),
            })}
        >
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    {
                        (!isEmpty(filterByList)) &&
                        <Dropdown id="FilterBy" list={filterByList} item_label_key="headerName" item_value_key="field" size="small"
                            value={filterByValue} onChange={(value) => handleFilterByChange(value)} />
                    }
                </Grid>
                <Grid item xs={2}>
                    <TextField id="table-search" placeholder={searchPlaceHolder} type="search" variant="outlined" size="small" margin="normal"
                        onChange={(e) => searchDebounce(e)} />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={2}>
                    <Button onClick={handleDownload} color="primary"> Download </Button>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

TableToolbar.defaultProps = {
    title: "",
    searchPlaceHolder: "Search",
    filterByList: [],
    filterByValue: "",
    setFilterByValue: null
};

export default TableToolbar;