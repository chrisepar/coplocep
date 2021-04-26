import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from 'styles/core/fields/_formControl.js';

function TextFieldCore(props) {
    const classes = useStyles();
    const { id, label, value, onChange, disabled} = props;
    return (
        <TextField key={id + "Key"}
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            InputLabelProps={{
                shrink: true,
                // className: classes.labelCore
                classes: {
                    root: classes.labelRoot
                }
            }}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

TextFieldCore.defaultProps = {
    id: "",
    label: "",
    value: "",
    onChange: () => {},
    disabled: false
};

export default TextFieldCore;