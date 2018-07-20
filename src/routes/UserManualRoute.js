import
    React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserManualCreateSession from "../containers/UserManualCreateSession";
import UserManualSelect from "../containers/UserManualSelect";

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (

    <div className="rounded-container bg-color-accent">
        <Switch>
            <Route exact path='/manual' component={UserManualSelect}/>
            <Route exact path='/manual/web/create/:Id' component={UserManualCreateSession}/>
        </Switch>

    </div>
);


export default Roster

