import React from 'react';
import {
    useParams
} from "react-router-dom";

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

const civilStatusList = [
    {
        value: "S",
        label: "Single"
    }, {
        value: "M",
        label: "Married"
    }, {
        value: "W",
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

function memberDetails(props) {
    const classes = useStyles();
    let { detailID } = useParams();
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
                    <SaveButton />
                </Grid>

                <Grid item xs={3}>
                    <TextField id="lastName" label="Last Name" />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="firstName" label="First Name" />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="middleName" label="Middle Name" />
                </Grid>
                <Grid item xs={3}>
                    <Dropdown id="civilStatus" label="Civil Status" list={civilStatusList} defaultVal="S" />
                </Grid>



                <Grid item xs={6}>
                    <TextField id="address" label="Address" />
                </Grid>
                <Grid item xs={6} />


                <Grid item xs={3}>
                    <TextField id="birthDate" label="Birthdate" />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="age" label="Age" />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="birthPlace" label="Birthplace" />
                </Grid>


                <Grid item xs={3}>
                    <TextField id="occupation" label="Occupation" />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="salary" label="Salary" />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="otherIncome" label="Other Source of Income" />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="tinNumber" label="Tin Number" maxLength={9} />
                </Grid>


                <Grid item xs={3}>
                    <Dropdown id="educationalAttainment" label="Educational Attainment" list={educationalAttainment} defaultVal="NA" />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="nameOfSpouse" label="Name of Spouse" />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="noOfDependencies" label="No. of Dependencies" maxLength={2} />
                </Grid>


                <Grid item xs={4}>
                    <MultilineField id="existingCoop" label="Indicate Other Affiliated Cooperative" />
                </Grid>
                <Grid item xs={4}>
                    <MultilineField id="trainingsAttended" label="Indicate Trainings, When, and Who conducted" />
                </Grid>
                <Grid item xs={4}>
                    <MultilineField id="creditReferences" label="Credit References" />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default memberDetails;