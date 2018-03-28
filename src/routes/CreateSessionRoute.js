import
    React from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateSession from '../containers/CreateSession'

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
    <Switch>
        <Route exact path='/create-session' component={CreateSession}/>
    </Switch>
)


export default Roster

