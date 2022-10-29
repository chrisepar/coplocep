import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import useStyles from 'app/core/styles/fields/_formControl.js';
import isEmpty from "app/core/helpers/is_empty.js";

function DropdownCore(props) {
    const { classes } = useStyles();
    const { id, label, value, list, helperText, onChange, item_label_key, item_value_key, disabled, fullWidth, size, placeHolder, error, isTextValue } = props;
    return (
        <TextField key={id + "Key"}
            id={id + "Dropdown"}
            select
            label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            helperText={helperText}
            variant="outlined"
            fullWidth={fullWidth}
            error={error}
            margin="normal"size={size}
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.labelRoot,
                    asterisk: classes.labelAsterisk
                }
            }}
            disabled={disabled}
        >
            {
                list.map((item, index) => {
                    let label = !isEmpty(item_label_key) ? item[item_label_key] : item.label;
                    let value = !isEmpty(item_value_key) ? item[item_value_key] : item.value;
                    let textValue = (isTextValue) ? label : value;
                    return (
                        <MenuItem key={index} value={textValue} >
                            { label }
                        </MenuItem>
                    );
                })
            }
        </TextField>
    );
};

DropdownCore.defaultProps = {
    id: "",
    label: "",
    value: "",
    list: [],
    helperText: "",
    onChange: () => { },
    disabled: false,
    fullWidth: true,
    size: "medium",
    error: false,
    isTextValue: false
};

export default DropdownCore;