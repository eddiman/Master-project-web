import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionInfo from '../components/SessionInfo'

class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: parseInt(props.match.params.Id, 10),
        }
    }

    render(){
        return(
            <Column offsetLg="2"  xs ="12"  lg="6">
                <CardOuter>
                    <DarkBar/>
                    <TitleBar/>
                    <SessionInfo sessionId={this.state.sessionId}/>

                </CardOuter>
            </Column>



        )
    }
}

export default Session;