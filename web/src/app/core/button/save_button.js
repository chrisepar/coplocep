
import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import useStyles from 'styles/core/buttons/_buttons.js';

function SaveButtonCore(props) {
    const classes = useStyles();
    const { id, label } = props;
    return (
        <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
        >
            Save
        </Button>
    );
};

SaveButtonCore.defaultProps = {
    id: "",
    label: ""
};

export default SaveButtonCore;