import React from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from 'styles/core/fields/_formControl.js';

function MultilineFieldCore(props) {
    const classes = useStyles();
    const { id, label, value, onChange } = props;
    return (
        <TextField key={id + "Key"} multiline
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            rows={4}
            InputLabelProps={{
                shrink: true,
                classes: {
                    root: classes.labelRoot
                }
            }}
            value={(value !== null) ? value : ""}
            onChange={(event) => onChange(event.target.value)}
        />
    );
};

MultilineFieldCore.defaultProps = {
    id: "",
    label: "",
    value: "",
    onChange: () => { },
};

export default MultilineFieldCore;