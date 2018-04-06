import React from 'react'
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
        const {Name, User} = session;

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