import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Dropdown from 'app/core/fields/dropdown_field.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from 'app/core/fields/text_field.js';
import DateField from 'app/core/fields/date_field.js';
import NumberField from 'app/core/fields/number_field.js';
import CurrencyField from 'app/core/fields/currency_field.js';
import MultilineField from 'app/core/fields/multiline_field.js';
import SaveButton from 'app/core/button/save_button.js';
import moment from 'moment';

//Apps
import Layout from "app/core/layout/layout.js";
// Styles
import useStyles from 'styles/_memberDetailsView.js';

import { postData } from 'app/core/helpers/fetch.js';
import appDetails from '_appDetails.js';

function loanDetails(props) {
    const classes = useStyles();
    let { detailID } = useParams();
    return (
        <Layout appName={props.appName}>
            <Grid container spacing={3} >
            </Grid>
        </Layout>
    );
};

export default loanDetails;