import React from 'react'
import { Link } from 'react-router-dom'
import {Column} from '../components/Column';
import {Row} from '../components/Row';
import styled from 'styled-components';
import loadingIcon from '../res/img/gear-loading.png'


const LoadingIcon = styled.img`
    animation: App-logo-spin infinite 10s linear;
    margin: 32px;
    height: 60px;
    opacity: 0.3;
    @keyframes App-logo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
    }

`;

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
        let formData = new FormData;
        formData.append("Finished", "1");

        const initConfig = {
            method : 'POST',
            body: formData
        };

        this.setState({
            isLoading: true,
            sessions: []
        });


        fetch('http://firetracker.freheims.xyz:8000/sessions', initConfig)
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
                    }) :
                        <Row>
                            <Column offsetLg="5" xs="12" lg="6">

                                <LoadingIcon src={loadingIcon}/>
                                <h3>Loading...</h3>
                            </Column>
                        </Row>
                }
            </div>

        )
    }
}

export default SessionList;
