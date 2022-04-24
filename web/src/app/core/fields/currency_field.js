import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import useStyles from 'app/core/styles/fields/_formControl.js';

function CurrencyFieldCore(props) {
    const classes = useStyles();
    const { id, label, prefix, value, onChange, disabled } = props;

    const onValueChange = (values) => {
        const {formattedValue, value} = values;
        onChange(value);
    };

    return (
        <NumberFormat key={id + "Key"}
            name={id + "Currency"}
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            customInput={TextField}
            InputLabelProps={{
                shrink: true,
            }}
            thousandSeparator
            isNumericString
            prefix={prefix}
            value={value}
            onValueChange={(values) => onValueChange(values)}
            disabled={disabled}
        />
    );
};

CurrencyFieldCore.defaultProps = {
    id: "",
    label: "",
    prefix: "Php ",
    value: "",
    onChange: () => { },
    disabled: false
};

export default CurrencyFieldCore;