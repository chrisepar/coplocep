import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from 'app/core/styles/fields/_formControl.js';
import field_types from 'app/core/fields/field_types.js';
import FormatValue from "app/core/helpers/format_value.js";

function TextFieldCore(props) {
    const classes = useStyles();
    const { id, label, value, onChange, disabled, required, error} = props;

    return (
        <TextField key={id + "Key"}
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.labelRoot,
                    asterisk: classes.labelAsterisk
                }
            }}
            value={FormatValue(field_types.text_field, value)}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            required={required}
            error={error}
        />
    );
};

TextFieldCore.defaultProps = {
    id: "",
    label: "",
    value: "",
    onChange: () => {},
    disabled: false,
    required: false,
    error: false
};

export default TextFieldCore;