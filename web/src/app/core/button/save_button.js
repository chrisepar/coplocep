
import React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

import CoreButton from "app/core/button/core_button.js";

import useStyles from 'app/core/styles/buttons/_buttons.js';

function SaveButtonCore(props) {
    const { classes } = useStyles();
    const { id, label } = props;
    return (
        <CoreButton startIcon={<SaveIcon />} label="Save" {...props} />
    );
};

export default SaveButtonCore;