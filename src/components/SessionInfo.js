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
                    <h1 className="font-header">Informasjon</h1>
                    <hr/>
                    <h2>Navn: {Name}</h2>
                    <p>Bruker: {User} </p>
                    <p> Starttid: {this.dateConverter(StartTime).toLocaleString() + " "} </p>
                    <p> Sluttid: {this.dateConverter(EndTime).toLocaleString() + " "} </p>



                </div>

                <div>
                    <h1 className="font-header">Innholdsfortegnelse</h1>
                    <hr/>
                    <div className="container flex-align-items-center margin8px">
                        <div className="current-mark margin8px"/>
                        <span>Nåværende posisjon</span>
                    </div>

                    <div className="container flex-align-items-center margin8px">
                        <div className="last-pos-mark margin8px"/>
                        <span>Forrige posisjon</span>
                    </div>

                    <div className="container flex-align-items-center margin8px">
                        <div className="pos-mark margin8px"/>
                        <span>En registrert posisjon, jo større den er, jo lenger har brukeren oppholdt seg på stedet.</span>
                    </div>

                    <div className="container flex-align-items-center margin8px">
                        <div className="beacon-mark margin8px"/>
                        <span>Posisjon til beacon</span>
                    </div>


                </div>


            </div>
        )
    }
}

export default SessionInfo;