import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import appDetails from '_appDetails.js';

import { Grid, Box, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import 'css/_login.css';

export default function Login() {
    const history = useHistory();

    const onChangeRole = (event) => {
        // setPersonName(event.target.value);
        history.push(appDetails.baseRoute + "/membership");
    };

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
                    onChange={onChangeRole}>
                    <MenuItem value="AD">Administrator</MenuItem>
                    <MenuItem value="CA">Cashier</MenuItem>
                    <MenuItem value="BK">Book Keeper</MenuItem>
                    <MenuItem value="AM1">Approving Manager #1</MenuItem>
                    <MenuItem value="AM2">Approving Manager #2</MenuItem>
                    <MenuItem value="DIR">Director</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
}