import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionList from "../components/AllSessionsList";
import Card from "../components/Card";

class AllSessions extends React.Component {

    render(){
        return(
                <Card flexDirection ="column" titleText="Select a session">
                    <SessionList/>
                </Card>



        )
    }
}

export default AllSessions;