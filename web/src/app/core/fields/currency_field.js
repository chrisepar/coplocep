import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import useStyles from 'styles/core/fields/_formControl.js';

function CurrencyFieldCore(props) {
    const classes = useStyles();
    const { id, label, prefix,  } = props;

    return (
        <NumberFormat key={id + "Key"}
            name={id + "Currency"}
            id={id} label={label}
            variant="outlined"
            margin="normal" fullWidth
            customInput={TextField}
            // onValueChange={(values) => {
            //     onChange({
            //         target: {
            //             name: props.name,
            //             value: values.value,
            //         },
            //     });
            // }}
            InputLabelProps={{
                shrink: true,
                // className: classes.labelCore
            }}
            thousandSeparator
            isNumericString
            prefix={prefix}
        />
    );
};

CurrencyFieldCore.defaultProps = {
    id: "",
    label: "",
    prefix: "Php "
};

export default CurrencyFieldCore;