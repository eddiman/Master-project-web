import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionList from "./SessionList";

class AllSessions extends React.Component {

    render(){
        return(
            <Column offsetLg="2"  xs ="12"  lg="8">
                <CardOuter>
                    <DarkBar/>
                    <TitleBar/>
                    <SessionList/>
                </CardOuter>
            </Column>



        )
    }
}

export default AllSessions;