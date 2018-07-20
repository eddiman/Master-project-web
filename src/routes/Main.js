import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OpenSessionRoute from "./OpenSessionRoute";
import Home from '../containers/Home';
import CreateSessionRoute from "../routes/CreateSessionRoute";
import UserManualCreateSession from "../containers/UserManualCreateSession";
import UserManualRoute from "./UserManualRoute";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/session/' component={OpenSessionRoute}/>
            <Route path='/create-session' component={CreateSessionRoute}/>
            <Route path='/manual' component={UserManualRoute}/>
        </Switch>
    </main>
);

export default Main