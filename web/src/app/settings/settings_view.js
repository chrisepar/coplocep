import React, { useEffect, useState } from 'react';
import Layout from "app/core/layout/layout.js";
import Grid from '@material-ui/core/Grid';

import useStyles from "app/settings/styles/_settings.js";

import NumberField from "app/core/fields/number_field.js";
import SaveButton from 'app/core/button/save_button.js';
import Loading from 'app/core/helpers/loading_screen.js';

import { model, saveSettings, getSettings } from "app/settings/settings_model.js";

export default (props) => {
    const classes = useStyles();

    const [isLoading, setLoading] = useState(null);
    const [detail, setDetail] = useState(model);

    useEffect(() => {
        let mounted = true;
        getSettings().then((items) => {
            if (mounted && items.length > 0) {
                console.log("Success Get");
                const item = items[0];
                setDetail(item);
            } else {
                console.log("Fail Get");
            }
            setLoading(false);
        })
        return () => mounted = false;
    }, [])

    const handleChange = (value, field) => {
        var newDetail = _.clone(detail);
        newDetail[field] = value;
        setDetail(newDetail);
    };

    const handleSave = (event) => {
        setLoading(true);
        saveSettings(detail).then((data) => {
            if (data) {
                console.log("Success Save Settings");
            } else {
                console.log("Fail Save Settings");
            }
            setLoading(false);
        });
    };

    return (
        <Layout appName={props.appName}>
            {(isLoading) ? <Loading /> : null}
            <Grid container spacing={3} >
                <Grid item xs={10} />
                <Grid item xs={2} >
                    <SaveButton onClick={handleSave} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="Interest" label="Interest Percent" maxValue={100}
                        value={detail.Interest} onChange={(value) => handleChange(value, "Interest")} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="Term" label="Term" maxValue={60}
                        value={detail.Term} onChange={(value) => handleChange(value, "Term")} />
                </Grid>
                <Grid item xs={6} />
            </Grid>
        </Layout>
    );
};
