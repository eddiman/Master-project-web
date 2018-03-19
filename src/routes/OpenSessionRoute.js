import
    React from 'react'
import { Switch, Route } from 'react-router-dom'
import Session from '../containers/Session'
import AllSessions from '../containers/AllSessions'

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
    <Switch>
        <Route exact path='/session/' component={AllSessions}/>
        <Route path='/session/:Id' component={Session}/>
    </Switch>
)


export default Roster

