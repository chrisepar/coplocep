import React, { useEffect, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CurrencyField from 'app/core/fields/currency_field.js';


export default (props) => {
    const { categoryTitle, category, amount, setAmount } = props;
    return (
        <DialogContent>
            <DialogContentText>
                {categoryTitle}
            </DialogContentText>
            <CurrencyField id={category} label="Amount" value={amount} onChange={(value) => setAmount(value)} />
        </DialogContent>
    );
};