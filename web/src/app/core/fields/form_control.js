import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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