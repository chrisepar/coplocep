import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import useStyles from 'styles/core/fields/_formControl.js';
import field_types from 'app/core/fields/field_types.js';
import FormatValue from "app/core/helpers/format_value.js";

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
            value={FormatValue(field_types.number_field, value)}
            onChange={(event) => onChange(event.target.value)}
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