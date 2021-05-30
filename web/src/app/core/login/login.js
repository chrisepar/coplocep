import React, { useEffect, useState } from 'react';
import { useHistory, Redirect, Route } from "react-router-dom";
import { setSession, getUser } from "app/core/helpers/session_storage.js";

import { Grid, Box, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import 'css/_login.css';
import appDetails from '_appDetails.js';

const getUserRoles = () => {
    return fetch(appDetails.apiRoute + 'security/list')
        .then(data => data.json())
};

export default () => {
    const history = useHistory();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState("");

    const isUserLoggedIn = () => {
        return getUser() !== null;
    };

    const onChangeRole = (event, item) => {
        const selected = event.target.value;
        const user = { Code: item.props.value, Name: item.props.children };
        setUser(selected);
        setSession("user", JSON.stringify(user));
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
    // End

    if (!isUserLoggedIn()) {
        return (
            <Grid container
                direction="column"
                alignItems="center" justify="center"
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