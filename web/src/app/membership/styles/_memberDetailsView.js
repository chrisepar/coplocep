import { makeStyles } from 'tss-react/mui';
export default makeStyles()((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    inputLabel: {
        fontWeight: 'bold'
    }
}));