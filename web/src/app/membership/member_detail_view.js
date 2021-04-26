import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import _ from 'lodash';

import Dropdown from 'app/core/fields/dropdown_field.js';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from 'app/core/fields/text_field.js';
import NumberField from 'app/core/fields/number_field.js';
import CurrencyField from 'app/core/fields/currency_field.js';
import MultilineField from 'app/core/fields/multiline_field.js';
import SaveButton from 'app/core/button/save_button.js';

//Apps
import Layout from "app/core/layout/layout.js";
// Styles
import useStyles from 'styles/_memberDetailsView.js';

import { postData } from 'app/core/helpers/fetch.js';
import appDetails from '_appDetails.js';

const civilStatusList = [
    {
        value: "Single",
        label: "Single"
    }, {
        value: "Married",
        label: "Married"
    }, {
        value: "Windowed",
        label: "Windowed"
    }
];

const educationalAttainment = [
    {
        value: "NA",
        label: "Not Applicable"
    },
    {
        value: "HS",
        label: "High School"
    }, {
        value: "CO",
        label: "College"
    }
];

const getMember = (memberKey) => {
    return fetch(appDetails.apiRoute + 'membership/list?memberKey=' + memberKey)
        .then(data => data.json());
};

const saveMember = (memberKey, data) => {
    var url = appDetails.apiRoute + 'membership/edit/' + memberKey;
    return postData(url, data)
        .then(data => data.json());
};

function memberDetails(props) {
    const classes = useStyles();
    let { detailID } = useParams();

    const [detail, setDetail] = useState({});
    // Get Member Details - Start
    useEffect(() => {
        let mounted = true;
        getMember(detailID)
            .then(items => {
                if (mounted) {
                    setDetail(items[0]);
                }
            })
        return () => mounted = false;
    }, []);
    // End

    const handleChange = (event, field) => {
        var newDetail = _.clone(detail);
        newDetail[field] = event.target.value;
        setDetail(newDetail);
    };

    const handleSave = (event) => {
        saveMember(detailID, detail);
    };

    return (
        <Layout appName={props.appName}>
            <Grid container spacing={3} >
                <Grid item xs={4}>
                    <Typography variant="h4" gutterBottom >
                        Personal Data {(detailID === "~") ? " - New Member" : " - " + detailID}
                    </Typography>
                </Grid>
                <Grid item xs={7} />
                <Grid item xs={1} >
                    <SaveButton onClick={handleSave} />
                </Grid>

                <Grid item xs={3}>
                    <TextField id="LastName" label="Last Name"
                        value={detail["LastName"]} onChange={(event) => handleChange(event, "LastName")} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="FirstName" label="First Name"
                        value={detail["FirstName"]} onChange={(event) => handleChange(event, "FirstName")} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="MiddleName" label="Middle Name"
                        value={detail["MiddleName"]} onChange={(event) => handleChange(event, "MiddleName")} />
                </Grid>
                <Grid item xs={3}>
                    <Dropdown id="CivilStatus" label="Civil Status" list={civilStatusList} defaultVal="S"
                        value={detail["CivilStatus"]} onChange={(event) => handleChange(event, "CivilStatus")} />
                </Grid>



                <Grid item xs={6}>
                    <TextField id="Address" label="Address"
                        value={detail["Address"]} onChange={(event) => handleChange(event, "Address")} />
                </Grid>
                <Grid item xs={6} />


                <Grid item xs={3}>
                    <TextField id="Birthdate" label="Birthdate"
                        value={detail["Birthdate"]} onChange={(event) => handleChange(event, "Birthdate")} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="Age" label="Age" disabled={true} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="Birthplace" label="Birthplace"
                        value={detail["Birthplace"]} onChange={(event) => handleChange(event, "Birthplace")} />
                </Grid>


                <Grid item xs={3}>
                    <TextField id="Occupation" label="Occupation"
                        value={detail["Occupation"]} onChange={(event) => handleChange(event, "Occupation")} />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="Salary" label="Salary"
                        value={detail["Salary"]} onChange={(event) => handleChange(event, "Salary")} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="OtherIncome" label="Other Source of Income"
                        value={detail["OtherIncome"]} onChange={(event) => handleChange(event, "OtherIncome")} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="TinNumber" label="Tin Number" maxLength={9}
                        value={detail["TinNumber"]} onChange={(event) => handleChange(event, "TinNumber")} />
                </Grid>


                <Grid item xs={3}>
                    <Dropdown id="EducationalAttainment" label="Educational Attainment" list={educationalAttainment} defaultVal="NA"
                        value={detail["EducationalAttainment"]} onChange={(event) => handleChange(event, "EducationalAttainment")} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="SpouseName" label="Name of Spouse"
                        value={detail["SpouseName"]} onChange={(event) => handleChange(event, "SpouseName")} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="Dependencies" label="No. of Dependencies" maxLength={2}
                        value={detail["Dependencies"]} onChange={(event) => handleChange(event, "Dependencies")} />
                </Grid>


                <Grid item xs={4}>
                    <MultilineField id="OtherCooperative" label="Indicate Other Affiliated Cooperative"
                        value={detail["OtherCooperative"]} onChange={(event) => handleChange(event, "OtherCooperative")} />
                </Grid>
                <Grid item xs={4}>
                    <MultilineField id="Trainings" label="Indicate Trainings, When, and Who conducted"
                        value={detail["Trainings"]} onChange={(event) => handleChange(event, "Trainings")} />
                </Grid>
                <Grid item xs={4}>
                    <MultilineField id="CreditReferences" label="Credit References"
                        value={detail["CreditReferences"]} onChange={(event) => handleChange(event, "CreditReferences")} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default memberDetails;