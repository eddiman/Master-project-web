import React from 'react'
import { Link } from 'react-router-dom'
import {Column} from '../components/Column';
import {Row} from '../components/Row';

class SessionList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            sessions: []
        }
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){

        this.setState({
            isLoading: true,
            sessions: []
        });


        fetch('http://firetracker.freheims.xyz:8000/raw/sessions')
            .then(response => response.json())

            .then(parsedJSON => parsedJSON.map(session => (
                {
                    id: `${session.ID}`,
                    createdAt: `${session.CreatedAt}`,
                    updatedAt: `${session.UpdatedAt}`,
                    name: `${session.Name}`,
                    user: `${session.User}`,
                    startTime: `${session.StartTime}`,
                    endTime: `${session.EndTime}`
                }
            )))
            .then(sessions => this.setState({
                sessions,
                isLoading: false
            }))
            .catch(error => console.log('parsing failed', error))
    }



    render(){
        const {isLoading, sessions} = this.state;



        console.log(sessions);
        return(


            <div>

                {


                    !isLoading && sessions.length > 0 ? sessions.map(session => {
                        const {id, createdAt, updatedAt, name, user, startTime, endTime} = session;
                        const SessionComp = () => (
                            <Link to={`/session/${id}`}>
                            <Row>
                                <Column xs="12" lg="12" key={id}>
                                    Session: {name}, User: {user} Date: {createdAt}
                                    <hr/>
                                </Column>
                            </Row>
                            </Link>
                        );
                        return <SessionComp/>
                    }) : null
                }
            </div>

        )
    }
}

export default SessionList;