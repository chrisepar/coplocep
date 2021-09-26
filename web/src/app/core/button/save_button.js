
import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import CoreButton from "app/core/button/core_button.js";

import useStyles from 'app/core/styles/buttons/_buttons.js';

function SaveButtonCore(props) {
    const classes = useStyles();
    const { id, label } = props;
    return (
        <CoreButton startIcon={<SaveIcon />} label="Save" {...props} />
    );
};

export default SaveButtonCore;