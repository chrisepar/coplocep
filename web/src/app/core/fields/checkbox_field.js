import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import useStyles from 'styles/core/fields/_formControl.js';

function CheckBoxCore(props) {
    const { id, label, } = props;
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <FormControlLabel key={id + "Key"}
            id={id} margin="normal"
            name={id + "Checkbox"}
            control={
                <Checkbox color="primary" checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
            }
            label={label} labelPlacement="start"
        />
    );
};

CheckBoxCore.defaultProps = {
    id: "",
    label: "",
};


export default CheckBoxCore;