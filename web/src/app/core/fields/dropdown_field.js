import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import useStyles from 'styles/core/fields/_formControl.js';

function DropdownCore(props) {
    const classes = useStyles();
    const { id, label, value, list, helperText, onChange } = props;
    return (
        <TextField key={id + "Key"}
            id={id + "Dropdown"}
            select
            label={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            helperText={helperText}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true
            }}
        >
            {
                list.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item.value} >{item.label}</MenuItem>
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
    onChange: () => {}
};

export default DropdownCore;