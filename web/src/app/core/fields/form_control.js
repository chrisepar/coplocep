import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

function FormControlCore(props) {
    const { children, id, label } = props;
    return (
        <FormControl variant="outlined" margin="normal" fullWidth>
            {children}
        </FormControl>
    );
};

FormControlCore.defaultProps = {
    children: null,
    id: "",
    label: ""
};

export default FormControlCore;