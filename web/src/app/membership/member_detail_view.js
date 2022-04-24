import React, { useEffect, useState } from 'react';
import {
    useParams, useHistory, withRouter
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
import Loading from 'app/core/helpers/loading_screen.js';
import Status from "app/core/fields/status_field.js";
import moment from 'moment';

//Apps
import Layout from "app/core/layout/layout.js";
import ApproveButton from "app/membership/components/approve_button.js";
import RejectButton from "app/membership/components/reject_button.js";

// Styles
import useStyles from 'app/membership/styles/_memberDetailsView.js';

import appDetails from '_appDetails.js';

import isTruthy from "app/core/helpers/is_truthy.js";
import isEmpty from "app/core/helpers/is_empty.js";
import { getUserName } from "app/core/authentication/authentication.js"

import { model, saveMember, getMember } from 'app/membership/member_model.js';
import { FormatDateFromISO } from 'app/core/helpers/date_format.js';

const civilStatusList = [
    {
        value: "Single",
        label: "Single"
    }, {
        value: "Married",
        label: "Married"
    }, {
        value: "Widowed",
        label: "Widowed"
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

function MemberDetails(props) {
    let { detailID } = props.match.params;
    const classes = useStyles();
    const history = useHistory();
    const isCreateMode = (detailID === "~");

    const [detail, setDetail] = useState(model);
    const [isLoading, setLoading] = useState(null);
    const [reload, setReload] = useState(0);
    const [isSuccess, setIsSuccess] = useState(0);

    const shouldFieldDisabled = (props.isModule) ? true : false;

    // Get Member Details - Start
    useEffect(() => {
        let mounted = true;
        if (!isCreateMode) {
            getMember(detailID)
                .then(items => {                    
                    if (mounted && items.results.length > 0) {
                        console.log("Success Get");
                        const item = items.results[0];
                        item.Birthdate = FormatDateFromISO(item.Birthdate);
                        setDetail(item);
                    } else {
                        console.log("Fail Get");
                        // return to list if no items
                        history.push(appDetails.baseRoute + "/membership");
                    }
                    setLoading(false);
                });
        } else {
            setDetail(model);
            setLoading(false);
        }
        return () => mounted = false;
    }, [detailID, reload]);
    // End


    const handleChange = (value, field) => {
        var newDetail = _.clone(detail);
        newDetail[field] = value;
        setDetail(newDetail);
    };

    const handleSave = (event) => {
        setLoading(true);
        saveMember(isCreateMode, detailID, detail).then((data) => {
            if (data) {
                if (isCreateMode) {
                    console.log("Success _insert");
                    history.push(appDetails.baseRoute + "/membership/" + data);
                } else {
                    console.log("Success _udpate");
                }
                // setIsSuccess(1);
            } else {
                console.log("Fail Fetch");
                // setIsSuccess(-1);
            }
            setLoading(false);
        }, (error) => {
            console.log("Fail Fetch");
            // setIsSuccess(-1);
        });
    };

    const getAge = () => {
        var birthDate = detail.Birthdate;
        if (birthDate) {
            var end = moment(birthDate); // another date
            if (end.isValid()) {
                var now = moment(new Date()); //todays date
                var duration = moment.duration(now.diff(end));
                return Math.abs(Math.floor(duration.asYears()));
            } else {
                return "";
            }
        } else {
            return "";
        }
    };
    
    const isApprovalAvailable = () => {
        return (isEmpty(detail.LastIsApproved)) ||
            (
                !isEmpty(detail.LastIsApproved) && isTruthy(detail.LastIsApproved)
                && isEmpty(detail.IsApprovedByCurrent) && !isTruthy(detail.IsFinalApproved)
            ) ||
            (detail.LastApprovedBy === getUserName());
    };

    const getApprovalButton = () => {
        if (!isCreateMode && isApprovalAvailable()) {
            return (
                <React.Fragment>
                    {
                        (isEmpty(detail.IsApprovedByCurrent) || isTruthy(detail.IsApprovedByCurrent)) &&
                        (
                            <RejectButton recordID={detailID} memberName={detail.Name} setReload={setReload} />
                        )
                    }
                    {
                        (isEmpty(detail.IsApprovedByCurrent) || !isTruthy(detail.IsApprovedByCurrent)) &&
                        (
                            <ApproveButton recordID={detailID} memberName={detail.Name} setReload={setReload} />
                        )
                    }
                </React.Fragment>
            )
        }
    };

    if (isLoading === null) {
        return (<Loading />);
    } else {
        return (
            <Grid container spacing={3} >
                {
                    (isLoading) ? <Loading /> : null
                }

                {
                    (!props.isModule) &&
                    (
                        <React.Fragment>
                            <Grid item xs={3}>
                                <TextField id="MemberKey" label="Member #" value={detail.MemberKey} disabled={true} />
                            </Grid>
                            <Grid item xs={3} >
                                <Status category="Membership" recordID={detailID} LastIsApproved={detail.LastIsApproved} IsFinalApproved={detail.IsFinalApproved} />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid container item xs={4} justifyContent="flex-end">
                                {getApprovalButton()}
                            </Grid>
                            <Grid item xs={1} >
                                <SaveButton onClick={handleSave} />
                            </Grid>
                        </React.Fragment>
                    )
                }

                <Grid item xs={3}>
                    <TextField id="LastName" label="Last Name"
                        value={detail.LastName} onChange={(value) => handleChange(value, "LastName")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="FirstName" label="First Name"
                        value={detail.FirstName} onChange={(value) => handleChange(value, "FirstName")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="MiddleName" label="Middle Name"
                        value={detail.MiddleName} onChange={(value) => handleChange(value, "MiddleName")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <Dropdown id="CivilStatus" label="Civil Status" list={civilStatusList}
                        value={detail.CivilStatus} onChange={(value) => handleChange(value, "CivilStatus")} disabled={shouldFieldDisabled} />
                </Grid>



                <Grid item xs={6}>
                    <TextField id="Address" label="Address"
                        value={detail.Address} onChange={(value) => handleChange(value, "Address")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={6} />


                <Grid item xs={3}>
                    <DateField id="Birthdate" label="Birthdate" disableFuture={true} openTo="year" views={["year", "month", "date"]}
                        value={detail.Birthdate} onChange={(value) => handleChange(value, "Birthdate")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="Age" label="Age" value={getAge()} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="Birthplace" label="Birthplace"
                        value={detail.Birthplace} onChange={(value) => handleChange(value, "Birthplace")} disabled={shouldFieldDisabled} />
                </Grid>


                <Grid item xs={3}>
                    <TextField id="Occupation" label="Occupation"
                        value={detail.Occupation} onChange={(value) => handleChange(value, "Occupation")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="Salary" label="Salary"
                        value={detail.Salary} onChange={(value) => handleChange(value, "Salary")}  disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="OtherIncome" label="Other Source of Income"
                        value={detail.OtherIncome} onChange={(value) => handleChange(value, "OtherIncome")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="TinNumber" label="Tin Number" maxLength={9}
                        value={detail.TinNumber} onChange={(value) => handleChange(value, "TinNumber")} disabled={shouldFieldDisabled} />
                </Grid>


                <Grid item xs={3}>
                    <Dropdown id="EducationalAttainment" label="Educational Attainment" list={educationalAttainment} defaultVal="NA"
                        value={detail.EducationalAttainment} onChange={(value) => handleChange(value, "EducationalAttainment")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="SpouseName" label="Name of Spouse"
                        value={detail.SpouseName} onChange={(value) => handleChange(value, "SpouseName")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <NumberField id="Dependencies" label="No. of Dependencies" maxLength={2}
                        value={detail.Dependencies} onChange={(value) => handleChange(value, "Dependencies")} disabled={shouldFieldDisabled} />
                </Grid>


                <Grid item xs={4}>
                    <MultilineField id="OtherCooperative" label="Indicate Other Affiliated Cooperative"
                        value={detail.OtherCooperative} onChange={(value) => handleChange(value, "OtherCooperative")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={4}>
                    <MultilineField id="Trainings" label="Indicate Trainings, When, and Who conducted"
                        value={detail.Trainings} onChange={(value) => handleChange(value, "Trainings")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={4}>
                    <MultilineField id="CreditReferences" label="Credit References"
                        value={detail.CreditReferences} onChange={(value) => handleChange(value, "CreditReferences")} disabled={shouldFieldDisabled} />
                </Grid>
            </Grid>
        );
    }
};

function MemberDetailContianer(props) {
    if (!props.isModule) {
        return (
            <Layout appName={props.appName}>
                <MemberDetails {...props} />
            </Layout>
        );
    } else {
        return (<MemberDetails {...props} />);
    }
};

MemberDetailContianer.defaultProps = {
    isModule: false
};

export default withRouter(MemberDetailContianer);