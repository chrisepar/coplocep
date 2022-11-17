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
    const { categoryTitle, category, newTransactData, setNewTransactData,
        status, setStatus, setDialogStatus, dialogStatus } = props;

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
                setNewTransactData({
                    ...newTransactData,
                    Interest: item.DefaultInterest,
                    Term: item.MaxTerm
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
            (waitCounter === 2) && setDialogStatus({ ...dialogStatus, isLoading: false });
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
            (waitCounter === 2) && setDialogStatus({ ...dialogStatus, isLoading: false });
        });

        return () => mounted = false;
    }, []);

    console.log("Render");
    return (
        <DialogContent>
            {(dialogStatus.isLoading || dialogStatus.isLoading === null) ? <Loading /> : null}
            <StatusBar open={status.open} setOpen={handleStatusClose} message={status.message} severity={status.severity} />
            <Grid container spacing={3} >
                <Grid item xs={2}>
                    <Dropdown id="TypeOfLoans" label="Type Of Loans" list={typeOfLoansList} isTextValue={true}
                        value={newTransactData.TypeOfLoan} onChange={(value) => handleChange(value, "TypeOfLoan")} item_value_key="Code" item_label_key="Name" />
                </Grid>
                <Grid item xs={2}>
                    <DateField id="StartDueDate" label="Due Date" openTo="month" views={["year", "month", "day"]} required={true}
                        value={newTransactData.StartDueDate} onChange={(value) => handleChange(value, "StartDueDate")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="Amount" label="Amount" value={newTransactData.Amount} onChange={(value) => handleChange(value, "Amount")} required={true} />
                </Grid>
                <Grid item xs={2}>
                    <NumberField id="Interest" label="Interest Rate" maxValue={100} fixedDecimalScale
                        value={newTransactData.Interest} onChange={(value) => handleChange(value, "Interest")} />
                </Grid>
                <Grid item xs={2}>
                    <NumberField id="Term" label="Term" decimalScale={0}
                        value={newTransactData.Term} onChange={(value) => handleChange(value, "Term")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="ServiceFee" label="Service Fee" value={newTransactData.ServiceFee} onChange={(value) => handleChange(value, "ServiceFee")} />
                </Grid>

                <Grid item xs={2}>
                    <CurrencyField id="InsuranceAmount" label="Insurance Amount" value={newTransactData.InsuranceAmount} onChange={(value) => handleChange(value, "InsuranceAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="FixedDepositAmount" label="Fixed Deposit Amount" value={newTransactData.FixedDepositAmount} onChange={(value) => handleChange(value, "FixedDepositAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="DocumentationAmount" label="Documentation Amount" value={newTransactData.DocumentationAmount} onChange={(value) => handleChange(value, "DocumentationAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="SavingsDepositAmount" label="Savings Deposit Amount" value={newTransactData.SavingsDepositAmount} onChange={(value) => handleChange(value, "SavingsDepositAmount")} />
                </Grid>

                <Grid item xs={2}>
                    <CurrencyField id="BalancePreviousLoanAmount" label="Balance Previous Loan Amount" value={newTransactData.BalancePreviousLoanAmount} onChange={(value) => handleChange(value, "BalancePreviousLoanAmount")} />
                </Grid>
                <Grid item xs={2}>
                    <CurrencyField id="InterestPreviousLoanAmount" label="Interest Previous Loan Amount" value={newTransactData.InterestPreviousLoanAmount} onChange={(value) => handleChange(value, "InterestPreviousLoanAmount")} />
                </Grid>
            </Grid>
        </DialogContent>
    );
};