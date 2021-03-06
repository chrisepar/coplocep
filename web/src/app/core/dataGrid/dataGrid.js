import * as React from 'react';
import PropTypes from 'prop-types';

import {
    DataGrid,
    GridToolbarContainer,
    GridColumnsToolbarButton,
    GridFilterToolbarButton,
    GridToolbarExport
} from '@material-ui/data-grid';

import useStyles from 'styles/core/_dataGrid.js';

function Toolbar() {
    return (
        <GridToolbarContainer>
            <GridColumnsToolbarButton />
            <GridFilterToolbarButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

function DataGridCore(props) {
    const classes = useStyles();
    const { data, columns, filterModel } = props;


    return (
        <DataGrid
            rows={data}
            columns={columns}
            filterModel={filterModel}
            components={{
                Toolbar: Toolbar,
            }}
            autoPageSize={true}
            pagination={true}
        />
    );
};

DataGridCore.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
};

DataGridCore.defaultProps = {
    data: [],
    columns: [],
    filterModel: null
};

export default DataGridCore;