import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DateField from 'app/core/fields/date_field.js';
import CurrencyField from 'app/core/fields/currency_field.js';
import NumberField from "app/core/fields/number_field.js";
import Loading from 'app/core/helpers/loading_screen.js';
import Button from 'app/core/button/core_button.js';
import StatusBar from "app/core/dialogs/statusbar.js";
import Dropdown from 'app/core/fields/dropdown_field.js';

import { model, getSettings } from "app/settings/settings_model.js";
import { getMember } from 'app/membership/member_model.js';

import { getTypeOfLoans } from 'app/transaction/transaction_model.js';


export default (props) => {
    const { categoryTitle, category, newTransactData, setNewTransactData, isLoading, setLoading, status, setStatus } = props;

    const [settingsDetails, setSettingDetails] = useState(model);
    const [typeOfLoansList, setTypeOfLoansList] = useState([]);

    // Handle Status Close
    const handleStatusClose = () => {
        setStatus(defaultStatus);
    };    

    const handleChange = (value, field) => {
        var newDetail = _.clone(newTransactData);
        newDetail[field] = value;
        setNewTransactData(newDetail);
    };

    useEffect(() => {
        let mounted = true;
        let waitCounter = 0;

        getSettings().then((items) => {
            if (mounted && items.length > 0) {
                console.log("Success Get");
                const item = items[0];
                setSettingDetails(item);
                setNewTransactData({
                    ...newTransactData,
                    interest: item.DefaultInterest,
                    term: item.MaxTerm
                });
            } else {
                console.log("Fail Get");
                setStatus({
                    open: true,
                    message: "An Error Occured",
                    severity: "error"
                });
            }
            waitCounter++;
            (waitCounter === 2) && setLoading(false);
        });

        getTypeOfLoans().then((items) => {
            if (mounted && items.length > 0) {
                console.log("Success Get");
                setTypeOfLoansList(items);
            } else {
                console.log("Fail Get");
                setStatus({
                    open: true,
                    message: "An Error Occured",
                    severity: "error"
                });
            }
            waitCounter++;
            (waitCounter === 2) && setLoading(false);
        });

        return () => mounted = false;
    }, []);


    console.log("Render");
    return (
        <DialogContent>
            {(isLoading || isLoading === null) ? <Loading /> : null}
            <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
            <Grid container spacing={3} >    
                <Grid item xs={2}>
                    <Dropdown id="TypeOfLoans" label="Type Of Loans" list={typeOfLoansList} isTextValue={true}
                        value={newTransactData.typeOfLoan} onChange={(value) => handleChange(value, "typeOfLoan")} item_value_key="Code" item_label_key="Name"/>
                </Grid>
                <Grid item xs={2}>
                    <DateField id="StartDueDate" label="Due Date" openTo="month" views={["year", "month", "day"]}
                        value={newTransactData.dueDate} onChange={(value) => handleChange(value, "dueDate")} />
                </Grid>            
                <Grid item xs={2}>
                    <CurrencyField id={category} label="Amount" value={newTransactData.amount} onChange={(value) => handleChange(value, "amount")} />
                </Grid>
                <Grid item xs={2}>
                    <NumberField id="Interest" label="Interest Rate" maxValue={100} fixedDecimalScale
                        value={newTransactData.interest}onChange={(value) => handleChange(value, "interest")} />
                </Grid>
                <Grid item xs={2}>
                    <NumberField id="Term" label="Term" decimalScale={0}
                        value={newTransactData.term} onChange={(value) => handleChange(value, "term")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={category} label="Service Fee" value={newTransactData.serviceFee} onChange={(value) => handleChange(value, "serviceFee")} />
                </Grid>

                <Grid item xs={2}>
                    <CurrencyField id={category} label="Insurance Amount" value={newTransactData.insuranceAmount} onChange={(value) => handleChange(value, "insuranceAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={category} label="Fixed Deposit Amount" value={newTransactData.fixedDepositAmount} onChange={(value) => handleChange(value, "fixedDepositAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={category} label="Documentation Amount" value={newTransactData.documentationAmount} onChange={(value) => handleChange(value, "documentationAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={category} label="Savings Deposit Amount" value={newTransactData.savingsDepositAmount} onChange={(value) => handleChange(value, "savingsDepositAmount")} />
                </Grid>

                <Grid item xs={2}>
                    <CurrencyField id={category} label="Balance Previous Loan Amount" value={newTransactData.balancePreviousLoanAmount} onChange={(value) => handleChange(value, "balancePreviousLoanAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id={category} label="Interest Previous Loan Amount" value={newTransactData.interestPreviousLoanAmount} onChange={(value) => handleChange(value, "interestPreviousLoanAmount")} />
                </Grid>
            </Grid>
        </DialogContent>
    );
};