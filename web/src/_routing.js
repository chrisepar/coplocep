import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Login from "app/core/login/login.js";

import 'css/_core.css';

import { getUser } from "app/core/helpers/session_storage.js";
import appList from 'app_list.js';

import Membership from "app/membership/members_list.js";
import MembershipDetails from 'app/membership/member_detail_view.js';
import Loans from "app/transaction/transaction_list.js";

import appDetails from '_appDetails.js';

const PrivateRoute = (props) => {

    const isUserLoggedIn = () => {
        return getUser() !== null;
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
                    <Login />
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