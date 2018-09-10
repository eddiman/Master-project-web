import
    React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import AddBeaconComponent from "../components/AddBeaconComponent";
import BeaconManagerContainer from "../containers/BeaconManagerContainer";
import AllBeaconsListComponent from "../components/AllBeaconsListComponent";

// The Roster component matches one of two different routes
// depending on the full pathname
const BeaconManagerRoute = () => (
    <Switch>
        <Route exact path='/beacons' component={BeaconManagerContainer}/>
        <Route exact path='/beacons/add' component={AddBeaconComponent}/>
        <Route path='/beacons/all' component={AllBeaconsListComponent}/>
    </Switch>
);


export default BeaconManagerRoute

