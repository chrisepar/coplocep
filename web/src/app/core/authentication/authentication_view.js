import React, { useEffect, useState } from 'react';
import { useHistory, Redirect, Route } from "react-router-dom";

import { Grid, Box, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import 'css/_authentication.css';

import appDetails from '_appDetails.js';

import { getUserRoles } from "app/core/authentication/authentication_model.js";
import { setUserSession, getUserSession } from "app/core/authentication/authentication.js"


export default () => {
    const history = useHistory();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState("");

    const isUserLoggedIn = () => {
        return getUserSession() !== null;
    };

    const onChangeRole = (event, item) => {
        const selected = event.target.value;
        const user = { Code: item.props.value, Name: item.props.children };
        setUser(selected);
        setUserSession(JSON.stringify(user));
        history.push(appDetails.baseRoute + "/membership");
    };

    useEffect(() => {
        let mounted = true;
        if (!isUserLoggedIn()) {
            getUserRoles()
                .then(items => {
                    if (mounted) {
                        setList(items)
                    }
                    setLoading(false);
                })
        }
        return () => mounted = false;
    }, []);

    if (!isUserLoggedIn()) {
        return (
            <Grid container
                direction="column"
                alignItems="center" justifyContent="center"
                className="loginContainer">
                <FormControl className="loginFormControl" variant="filled">
                    <InputLabel id="role-label">Login Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="login-role"
                        value={user}
                        onChange={onChangeRole}>
                        {
                            list.map((item, index) => (
                                <MenuItem key={index} value={item.Code}>{item.Name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
        );
    } else {
        return (
            <Route>
                <Redirect
                    to={appDetails.baseRoute + "/membership"}
                />
            </Route>
        );
    }
}