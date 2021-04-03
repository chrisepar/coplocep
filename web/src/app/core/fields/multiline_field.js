import React from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from 'styles/core/fields/_formControl.js';

function MultilineFieldCore(props) {
    const classes = useStyles();
    const { id, label } = props;
    return (
        <TextField key={id + "Key"} multiline
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            rows={4}
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

MultilineFieldCore.defaultProps = {
    id: "",
    label: ""
};

export default MultilineFieldCore;