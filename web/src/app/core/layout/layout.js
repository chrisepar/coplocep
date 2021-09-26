//Framework
import React, { Component } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from "react-router-dom";
import { removeUserSession, getUserName } from "app/core/authentication/authentication.js"
import appDetails from '_appDetails.js';

//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import isEmpty from "app/core/helpers/is_empty.js";

// Styles
import { useTheme } from '@material-ui/core/styles';
import useStyles from 'app/core/styles/_layout.js';

import appList from 'app_list.js';

export default function Layout(props) {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (event, path) => {
        history.push(path);
    }

    const handleLogout = () => {
        if (removeUserSession()) {
            history.push(appDetails.baseRoute);
        }
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {props.appName}
                    </Typography>
                    <div className={classes.logoutBtn}>
                        <Typography variant="h6" noWrap>
                            {getUserName()}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout} >Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {appList.map((app, index) => {
                        if (!isEmpty(app.navigation)) {
                            return (
                                <ListItem
                                    button
                                    key={app.id}
                                    selected={props.appName === app.name}
                                    onClick={(event) => handleListItemClick(event, !isEmpty(app.navigation.path) ? app.navigation.path : app.path)}>
                                    <ListItemIcon ><app.navigation.icon /></ListItemIcon>
                                    <ListItemText primary={app.navigation.label} />
                                </ListItem>
                            );
                        } else {
                            return (null);
                        }
                    }
                    )}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div className={classes.contentContainer}>
                    {props.children}
                </div>
            </main>
        </div>
    );
}