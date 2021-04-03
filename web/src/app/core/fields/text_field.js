import React from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from 'styles/core/fields/_formControl.js';

function TextFieldCore(props) {
    const classes = useStyles();
    const { id, label } = props;
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
        />
    );
};

TextFieldCore.defaultProps = {
    id: "",
    label: ""
};

export default TextFieldCore;