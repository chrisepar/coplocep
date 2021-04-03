import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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