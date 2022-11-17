import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StatusBar(props) {
    const { open, setOpen, message, severity } = props;
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}
