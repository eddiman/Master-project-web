import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import { Link } from 'react-router-dom'


class SessionInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            session : props.sessionObj
        }
    }

    render(){
        const session = this.props.sessionObj;
        const {ID, CreatedAt, UpdatedAt, Name, User, StartTime, EndTime} = session;

        return(

                    <div>
                        {
                                <div >
                                    <p>{Name} and {User} </p>
                                    <Link to={`/session`}>Back</Link>

                                </div>

                        }
                    </div>





        )
    }
}

export default SessionInfo;