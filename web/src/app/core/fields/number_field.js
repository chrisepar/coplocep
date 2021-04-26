import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import useStyles from 'styles/core/fields/_formControl.js';

function NumberFieldCore(props) {
    const classes = useStyles();
    const { id, label, thousandSeparator, format, maxLength, value, onChange } = props;

    return (
        <NumberFormat key={id + "Key"}
            name={id + "Number"}
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            customInput={TextField}
            InputLabelProps={{
                shrink: true,
            }}
            thousandSeparator={thousandSeparator}
            isNumericString
            format={format}
            inputProps={{ maxLength: maxLength }}
            value={value}
            onChange={onChange}
        />
    );
};

NumberFieldCore.defaultProps = {
    id: "",
    label: "",
    thousandSeparator: false,
    format: null,
    maxLength: null,
    value: "",
    onChange: () => { },
};

export default NumberFieldCore;