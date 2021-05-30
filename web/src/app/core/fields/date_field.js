import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from 'styles/core/fields/_formControl.js';
import { FormatDate } from 'app/core/helpers/date_format.js';

function DateFieldCore(props) {
    const classes = useStyles();
    const { id, label, value, onChange, disabled, disableFuture, openTo, views } = props;
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                key={id + "Key"}
                // disableToolbar
                autoOk disableFuture={disableFuture}
                variant="inline"
                inputVariant="outlined"
                margin="normal" fullWidth
                format="MM/dd/yyyy"
                id={id} label={label}
                value={FormatDate(value)}
                onChange={onChange}
                openTo={openTo}
                views={views}
                KeyboardButtonProps={{
                    'aria-label': 'change date'
                }}
                InputLabelProps={{
                    shrink: true,
                    classes: {
                        root: classes.labelRoot
                    }
                }}
            />
        </MuiPickersUtilsProvider>
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
    views: ["date"]
};

export default DateFieldCore;