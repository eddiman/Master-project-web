import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionList from "../components/AllSessionsList";

class AllSessions extends React.Component {

    render(){
        return(
            <Column offsetLg="2"  xs ="12"  lg="8">
                <CardOuter>
                    <TitleBar><h2>Available sessions</h2> </TitleBar>
                    <SessionList/>
                </CardOuter>
            </Column>



        )
    }
}

export default AllSessions;