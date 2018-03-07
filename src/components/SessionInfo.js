import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import { Link } from 'react-router-dom'


class SessionInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            sessionId: props.sessionId,
            sessions : [],
            sessionName : []
        }
    }
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){

        this.setState({
            isLoading: true,
            sessions : [],
            sessionName : []
        });


        fetch(`http://firetracker.freheims.xyz:8000/raw/session/1`)
            .then(response => response.json())
            .then(parsedJSON => (this.setState(
                {
                    sessions : parsedJSON,
                    isLoading : false
                    }
                )

            ))

            .catch(error => console.log('parsing failed', error))
    }

    render(){
        const sessions = this.state.sessions;
        const isLoading = this.state.isLoading;
        console.log(sessions.Name);
        const {ID, CreatedAt, UpdatedAt, Name, User, StartTime, EndTime} = sessions;
        return(

                    <div>
                        {
                                <div key={ID}>
                                    <h1>{Name} and {User}</h1>
                                    <Link to={`/session`}>Back</Link>

                                </div>

                        }
                    </div>





        )
    }
}

export default SessionInfo;