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
import StatusField from "app/core/fields/status_field.js";
import AlertDialog from "app/core/dialogs/alert_dialog.js";
import StatusBar from "app/core/dialogs/statusbar.js";
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

const typeOfMembershipItems = [
    {
        value: "Regular",
        label: "Regular"
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
    const [fieldErrors, setFieldErrors] = useState([]);
    
    const defaultStatus = {
        open: false,
        message: "",
        severity: "info"
    };

    const [status, setStatus] = React.useState(defaultStatus);

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
                        // item.Birthdate = FormatDateFromISO(item.Birthdate);
                        setDetail(item);
                    } else {
                        console.log("Fail Get");
                        setStatus({
                            open: true,
                            message: "An Error Occured.",
                            severity: "error"
                        });
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

    const validateFields = () => {
        let requiredFields = ["MemberID", "LastName", "FirstName", "MiddleName", "Birthdate", "Occupation", "Salary"];
        let fieldsWithError = [];
        for (let counter = 0; counter < requiredFields.length; counter++) {
            let field = requiredFields[counter];
            if (isEmpty(detail[field])) {
                fieldsWithError.push(field);
            }
        }
        return fieldsWithError;
    };

    const hasError = (field) => {
        return _.includes(fieldErrors, field);
    };


    const handleChange = (value, field) => {
        var newDetail = _.clone(detail);
        newDetail[field] = value;
        setDetail(newDetail);
    };

    const handleSave = (event) => {
        setLoading(true);
        let fieldsWithError = validateFields();
        if (isEmpty(fieldsWithError)) {
            saveMember(isCreateMode, detailID, detail).then((data) => {
                if (data) {
                    if (isCreateMode) {
                        console.log("Success _insert");
                        setFieldErrors([]);
                        setStatus({
                            open: true,
                            message: "Saved Successful!",
                            severity: "success"
                        });
                        history.push(appDetails.baseRoute + "/membership/" + data);
                    } else {
                        console.log("Success _udpate");
                        setFieldErrors([]);
                        setStatus({
                            open: true,
                            message: "Saved Successful!",
                            severity: "success"
                        });
                    }
                } else {
                    console.log("Fail Fetch");
                    setStatus({
                        open: true,
                        message: "An Error Occured - Saving Failed",
                        severity: "error"
                    });
                }
                setLoading(false);
            }, (error) => {
                console.log(error);
                setStatus({
                    open: true,
                    message: "An Error Occured - Saving Failed",
                    severity: "error"
                });
            });
        } else {
            setLoading(false);
            setFieldErrors(fieldsWithError);
            setStatus({
                open: true,
                message: "Please fill the form properly.",
                severity: "error"
            });
        }
    };

    const getAge = () => {
        var birthDate = _.get(detail, "Birthdate");
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

    // Handle Status
    const handleStatusClose = () => {
        setStatus(defaultStatus);
    };

    const isApprovalAvailable = () => {
        return (isEmpty(detail.LastIsApproved)) ||
            (
                !isEmpty(detail.LastIsApproved) && isTruthy(detail.LastIsApproved)
                && isEmpty(detail.IsApprovedByCurrent) && !isTruthy(detail.IsFinalApproved)
            ) ||
            (detail.LastApprovedBy === getUserName());
    };

    // Approval Button Generator
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
                <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
                {
                    (isLoading) ? <Loading /> : null
                }

                {
                    (!props.isModule) &&
                    (
                        <React.Fragment>
                            <Grid item xs={3}>
                                <TextField id="MemberID" label="Member #"  error={hasError("MemberID")} value={detail.MemberID} 
                                disabled={shouldFieldDisabled} onChange={(value) => handleChange(value, "MemberID")} required={true} />
                            </Grid>
                            <Grid item xs={3} >
                                <StatusField category="Membership" recordID={detailID} LastIsApproved={detail.LastIsApproved} IsFinalApproved={detail.IsFinalApproved} />
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
                    <TextField id="LastName" label="Last Name" error={hasError("LastName")}
                        value={detail.LastName} onChange={(value) => handleChange(value, "LastName")} disabled={shouldFieldDisabled} required={true} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="FirstName" label="First Name" error={hasError("FirstName")}
                        value={detail.FirstName} onChange={(value) => handleChange(value, "FirstName")} disabled={shouldFieldDisabled} required={true} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="MiddleName" label="Middle Name" error={hasError("MiddleName")}
                        value={detail.MiddleName} onChange={(value) => handleChange(value, "MiddleName")} disabled={shouldFieldDisabled} required={true} />
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
                    <DateField id="Birthdate" label="Birthdate" disableFuture={true} openTo="year" views={["year", "month", "date"]} error={hasError("Birthdate")}
                        value={detail.Birthdate} onChange={(value) => handleChange(value, "Birthdate")} disabled={shouldFieldDisabled} required={true} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="Age" label="Age" value={getAge()} disabled={true} />
                </Grid>
                <Grid item xs={6}>
                    <TextField id="Birthplace" label="Birthplace"
                        value={detail.Birthplace} onChange={(value) => handleChange(value, "Birthplace")} disabled={shouldFieldDisabled} />
                </Grid>


                <Grid item xs={3}>
                    <TextField id="Occupation" label="Occupation" error={hasError("Occupation")}
                        value={detail.Occupation} onChange={(value) => handleChange(value, "Occupation")} disabled={shouldFieldDisabled} required={true} />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="Salary" label="Salary" error={hasError("Salary")}
                        value={detail.Salary} onChange={(value) => handleChange(value, "Salary")} disabled={shouldFieldDisabled} required={true} />
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



                <Grid item xs={3}>
                    <Dropdown id="TypeOfMembership" label="Type of Membership" list={typeOfMembershipItems} defaultVal="Regular"
                        value={detail.TypeOfMembership} onChange={(value) => handleChange(value, "TypeOfMembership")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={9} />



                <Grid item xs={3}>
                    <NumberField id="BODResolutionNumber" label="BOD Resolution Number"
                        value={detail.BODResolutionNumber} onChange={(value) => handleChange(value, "BODResolutionNumber")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="AmountSubscribed" label="Amount Subscribed"
                        value={detail.AmountSubscribed} onChange={(value) => handleChange(value, "AmountSubscribed")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="SharesSubscribed" label="Number of Shares Subscribed"
                        value={detail.SharesSubscribed} onChange={(value) => handleChange(value, "SharesSubscribed")} disabled={shouldFieldDisabled} />
                </Grid>
                <Grid item xs={3}>
                    <CurrencyField id="InitialPaidUp" label="Initial Paid-Up"
                        value={detail.InitialPaidUp} onChange={(value) => handleChange(value, "InitialPaidUp")} disabled={shouldFieldDisabled} />
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