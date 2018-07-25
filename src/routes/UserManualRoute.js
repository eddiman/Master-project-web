import
    React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import UserManualCreateSession from "../containers/UserManualCreateSession";
import UserManualSelect from "../containers/UserManualSelect";
import UserManualMobile from "../containers/UserManualMobile";
import UserManualOpenSession from "../containers/UserManualOpenSession";

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (

    <div className="rounded-container bg-color-accent">
        <Switch>
            <Route exact path='/manual' component={UserManualSelect}/>
            <Route path='/manual/create/:Id/:Redirect?/:SubRedirect?' component={UserManualCreateSession}/>
            <Route exact path='/manual/mobile/:Id' component={UserManualMobile}/>
            <Route path='/manual/open/:Id/:Redirect?/:SubRedirect?' component={UserManualOpenSession}/>
        </Switch>

    </div>
);


export default Roster

