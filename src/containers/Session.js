import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionTestAPI from "../SessionTestData";
import { Link } from 'react-router-dom'


class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            session: SessionTestAPI.get(
                parseInt(props.match.params.Id, 14)
            )
        }
    }


    render(){
        return(
            <Column offsetLg="2"  xs ="12"  lg="6">
                <CardOuter>
                    <DarkBar/>
                    <TitleBar/>
                    <div>
                        <h1>{this.state.session.Name} (#{this.state.session.Id}) sada</h1>
                        <Link to='/session'>Back</Link>
                    </div>

                </CardOuter>
            </Column>



        )
    }
}

export default Session;