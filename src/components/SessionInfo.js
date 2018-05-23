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

    dateConverter(date) {
        return new Date(date);
    }

    render(){
        const session = this.props.sessionObj;
        const {Name, User, StartTime, EndTime} = session;

        return(

            <div className="container flex-container-column-direction margin8px">

                <div className="">
                    <h1 className="font-header">Information</h1>
                    <hr/>
                    <h2>Name: {Name}</h2>
                    <p>User: {User} </p>
                    <p> Start time of session: {this.dateConverter(StartTime).toLocaleString() + " "} </p>
                    <p> End time of session: {this.dateConverter(EndTime).toLocaleString() + " "} </p>



                </div>

                <div>
                    <h1 className="font-header">Legend</h1>
                    <hr/>
                    <div className="container flex-align-items-center margin8px">
                        <div className="current-mark margin8px"/>
                        <span>Current position</span>
                    </div>

                    <div className="container flex-align-items-center margin8px">
                        <div className="last-pos-mark margin8px"/>
                        <span>Last position</span>
                    </div>

                    <div className="container flex-align-items-center margin8px">
                        <div className="pos-mark margin8px"/>
                        <span>A recorded position</span>
                        <span>the larger it is, the longer the user has been there.</span>
                    </div>

                    <div className="container flex-align-items-center margin8px">
                        <div className="beacon-mark margin8px"/>
                        <span>Position of a beacon</span>
                    </div>


                </div>

                <div className="flex-align-self-end">
                    <button className="red-button margin8px" onClick={evt => this.stopPlayAllLocationEvents(evt)}>
                        <Link to={`/session`}>Back</Link>
                    </button>

                </div>




            </div>
        )
    }
}

export default SessionInfo;