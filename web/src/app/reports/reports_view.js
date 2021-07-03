import React, { useEffect, useState } from 'react';
import Layout from "app/core/layout/layout.js";
import Grid from '@material-ui/core/Grid';

export default (props) => {
    // const classes = useStyles();
    return (
        <Layout appName={props.appName}>
            <Grid container spacing={3} >
            </Grid>
        </Layout>
    );
};
