import { makeStyles, lighten } from '@material-ui/core/styles';

const drawerWidth = 240;

const useTableStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    paper: {
        // width: `calc(100% - ${drawerWidth}px)`,
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750,
    },
    tableRow: {
        height: 30
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    colHeaderContainer: {
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'           
    },
    totalRowStyle: {
        fontWeight: 'bold'
    },
    tableContainer: {
        maxHeight: '78vh',
    },
    emptyRows: {
        height: '75vh'
    },
    totalRow: {
        fontWeight: 'bold'
    }
}));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));
export {
    useTableStyles,
    useToolbarStyles
};