import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import useStyles from 'app/core/styles/fields/_formControl.js';
import field_types from 'app/core/fields/field_types.js';
import FormatValue from "app/core/helpers/format_value.js";
import isEmpty from "app/core/helpers/is_empty.js";

function NumberFieldCore(props) {
    const classes = useStyles();
    const { id, label, thousandSeparator, format, maxLength, value, onChange,
        isNumericString, allowLeadingZeros, allowNegative, maxValue,
        decimalScale, fixedDecimalScale, decimalSeparator, suffix } = props;

    const withValueLimit = (inputObj) => {
        if (!isEmpty(maxValue)) {
            const { value } = inputObj;
            if (value <= maxValue) return true;
        }
        return false;
    };

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
            isNumericString={isNumericString}
            format={format}
            inputProps={{ maxLength: maxLength }}
            value={FormatValue(field_types.number_field, value)}
            onChange={(event) => onChange(event.target.value)}
            allowLeadingZeros={allowLeadingZeros}
            allowNegative={allowNegative}
            isAllowed={withValueLimit}
            decimalScale={decimalScale}
            fixedDecimalScale={fixedDecimalScale}
            decimalSeparator={decimalSeparator}
            suffix={suffix}
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
    isNumericString: false,
    allowLeadingZeros: false,
    allowNegative: false,
    maxValue: null,
    decimalScale: 2,
    fixedDecimalScale: false,
    decimalSeparator: "."
};

export default NumberFieldCore;