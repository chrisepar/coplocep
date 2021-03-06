import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Login from "app/core/login/login.js";

import 'css/_core.css';

import appList from 'app_list.js';

// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept()

function Routing() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <Login />
                </Route>
                {appList.map((app, index) => {
                    return (
                        <Route key={app.id} path={"/loan/" + app.id} exact={true} component={app.component} />
                    );
                })}
            </Switch>
        </Router>
    );
};

ReactDOM.render(<Routing />, document.getElementById('app'));