import React from 'react';

import { hot } from 'react-hot-loader/root';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Login from "app/core/login/login.js";

import 'css/_core.css';

import appList from 'app_list.js';

import Membership from "app/membership/members_list.js";
import MembershipDetails from 'app/membership/member_detail_view.js';
import Loans from "app/loans/loans_list.js";

import appDetails from '_appDetails.js';

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
                        <Route key={index} path={app.path} exact={true} component={withProps(app.component, { appName: app.name })} />
                    );
                })}
                {/* <Route path={appDetails.baseRoute + '/' + 'membership'} exact={true} component={Membership} />
                <Route path={appDetails.baseRoute + '/' + 'membership/:detailID'} exact={true} component={MembershipDetails} />
                <Route path={appDetails.baseRoute + '/' + 'loans'} exact={true} component={Loans} /> */}
                {/* <Route path={appDetails.baseRoute + '/' + 'loans/:detailID'} exact={true} component={app.component} /> */}
            </Switch>
        </Router>
    );

};

export default RoutingCore;