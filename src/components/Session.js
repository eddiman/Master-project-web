import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionTestAPI from "../SessionTestData";

const SessionObj = (props) => {
    const session = SessionTestAPI.get(
        parseInt(props.match.params.Id, 14)
    )
};

class Session extends React.Component {

    render(){
        return(
            <Column offsetLg="2"  xs ="12"  lg="6">
                <CardOuter>
                    <DarkBar/>
                    <TitleBar/>
                </CardOuter>
            </Column>



        )
    }
}

export default Session;