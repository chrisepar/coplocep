import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useStyles from 'app/core/styles/fields/_formControl.js';
import { FormatDateFromISO } from 'app/core/helpers/date_format.js';

function DateFieldCore(props) {
    const { classes } = useStyles();
    const { id, label, value, onChange, disabled, disableFuture, openTo, views, required, error } = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                key={id + "Key"}
                // disableToolbar
                autoOk disableFuture={disableFuture}
                variant="inline"
                inputVariant="outlined"
                margin="normal" fullWidth
                format="MM/dd/yyyy"
                id={id} label={label}
                value={value}
                onChange={onChange}
                openTo={openTo}
                views={views}
                error={error}
                KeyboardButtonProps={{
                    'aria-label': 'change date'
                }}
                renderInput={(params) => <TextField {...params} helperText={null}
                    variant="outlined"
                    margin="normal" fullWidth
                    InputLabelProps={{
                        shrink: true,
                        classes: {
                            root: classes.labelRoot,
                            asterisk: classes.labelAsterisk
                        }
                    }}
                />}
            />
        </LocalizationProvider>
    );
};

DateFieldCore.defaultProps = {
    id: "",
    label: "",
    value: "",
    onChange: () => { },
    disabled: false,
    disableFuture: false,
    openTo: "date",
    views: ["date"],
    required: false,
    error: false
};

export default DateFieldCore;