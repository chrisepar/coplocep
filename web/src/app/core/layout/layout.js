//Framework
import React, { Component } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from "react-router-dom";
import { removeUserSession, getUserName } from "app/core/authentication/authentication.js"
import appDetails from '_appDetails.js';

//Material UI
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import isEmpty from "app/core/helpers/is_empty.js";

// Styles
import { useTheme } from '@mui/material/styles'
import useStyles from 'app/core/styles/_layout.js';

import appList from 'app_list.js';

export default function Layout(props) {
    const { classes } = useStyles();
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