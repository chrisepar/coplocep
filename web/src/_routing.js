import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import AuthenticationView from "app/core/authentication/authentication_view.js";
import { getUserSession } from "app/core/authentication/authentication.js"

import 'css/_core.css';

import appList from 'app_list.js';
import appDetails from '_appDetails.js';

const PrivateRoute = (props) => {

    const isUserLoggedIn = () => {
        return getUserSession() !== null;
    }

    if (isUserLoggedIn()) {
        return (
            <Route {...props} />
        );
    } else {
        return (
            <Route>
                <Redirect
                    to={appDetails.baseRoute}
                />
            </Route>
        );
    }
};

function withProps(Component, props) {
    return function (matchProps) {
        return <Component {...props} {...matchProps} />
    }
};

function RoutingCore() {
    return (
        <Router>
            <Switch>
                <Route path={appDetails.baseRoute} exact={true}>
                    <AuthenticationView />
                </Route>
                {appList.map((app, index) => {
                    return (
                        <PrivateRoute key={index} path={app.path} exact={true} component={withProps(app.component, { appName: app.name })} />
                    );
                })}
            </Switch>
        </Router>
    );

};

export default RoutingCore;