
import React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

import useStyles from 'app/core/styles/buttons/_buttons.js';

function CoreButton(props) {
    const { classes } = useStyles();
    const { id, label } = props;
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            {...props}
        >
            {label}
        </Button>
    );
};

export default CoreButton;