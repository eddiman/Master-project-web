import
    React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserManualCreateSession1 from "../components/UserManualCreateSession1";
import UserManualSelect from "../containers/UserManualSelect";

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (

    <div className="rounded-container bg-color-accent">
        <Switch>
            <Route exact path='/manual' component={UserManualSelect}/>
            <Route exact path='/manual/web/create/1' component={UserManualCreateSession1}/>
        </Switch>

    </div>
);


export default Roster

