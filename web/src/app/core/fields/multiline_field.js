import React from 'react';
import TextField from '@mui/material/TextField';
import useStyles from 'app/core/styles/fields/_formControl.js';

function MultilineFieldCore(props) {
    const { classes } = useStyles();
    const { id, label, value, onChange, disabled } = props;
    return (
        <TextField key={id + "Key"} multiline
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            rows={4}
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.labelRoot,
                    asterisk: classes.labelAsterisk
                }
            }}
            value={(value !== null) ? value : ""}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
        />
    );
};

MultilineFieldCore.defaultProps = {
    id: "",
    label: "",
    value: "",
    onChange: () => { },
    disabled: false
};

export default MultilineFieldCore;