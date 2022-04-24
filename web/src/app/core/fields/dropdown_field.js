import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import useStyles from 'app/core/styles/fields/_formControl.js';
import isEmpty from "app/core/helpers/is_empty.js";

function DropdownCore(props) {
    const classes = useStyles();
    const { id, label, value, list, helperText, onChange, item_label_key, item_value_key, disabled, fullWidth, size, placeHolder } = props;
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
            margin="normal"size={size}
            InputLabelProps={{
                shrink: true
            }}
            disabled={disabled}
        >
            {
                list.map((item, index) => {
                    return (
                        <MenuItem key={index} value={!isEmpty(item_value_key) ? item[item_value_key] : item.value} >
                            {
                                !isEmpty(item_label_key) ? item[item_label_key] : item.label
                            }
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
    size: "medium"
};

export default DropdownCore;