import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionList from "../components/AllSessionsList";
import Card from "../components/Card";

class AllSessions extends React.Component {

    render(){
        return(
            <div className="rounded-container">
                <Card flexDirection ="column" titleText="Select a session">
                    <SessionList/>
                </Card>
            </div>


        )
    }
}

export default AllSessions;