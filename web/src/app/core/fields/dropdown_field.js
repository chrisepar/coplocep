import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import useStyles from 'styles/core/fields/_formControl.js';

function DropdownCore(props) {
    const classes = useStyles();
    const { id, label, defaultVal, list, helperText, handleChange } = props;

    const [value, setValue] = React.useState(defaultVal);

    const onChange = (event) => {
        if (handleChange !== null) {
            handleChange();
        } else {
            setValue(event.target.value);
        }
    };

    return (
        <TextField key={id + "Key"}
            id={id + "Dropdown"}
            select
            label={label}
            value={value}
            onChange={onChange}
            helperText={helperText}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
                shrink: true,
                // className: classes.labelCore
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
    defaultVal: "",
    list: [],
    helperText: "",
    handleChange: null
};

export default DropdownCore;