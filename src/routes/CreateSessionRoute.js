import
    React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateSessionName from '../containers/CreateSessionName'

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
    <Switch>
        <Route exact path='/create-session' component={CreateSessionName}/>
    </Switch>
)


export default Roster

