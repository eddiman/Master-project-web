import React from 'react'
import { Link } from 'react-router-dom'
import {Column} from '../components/Column';
import {Row} from '../components/Row';
import styled from 'styled-components';
import loadingIcon from '../res/img/gear-loading.png'
import fireTrackerLogo from '../res/img/logo_fire_tracker.png'
import theme from "../theme/theme";
import LinkButton from "./LinkButton";
import ExifOrientationImg from 'react-exif-orientation-img'


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
                    endTime: `${session.EndTime}`,
                    mapUrl: `${session.Map}`

                }
            )))
            .then(sessions => this.setState({
                sessions,
                isLoading: false
            }))
            .catch(error => console.log('parsing failed', error))
    }

    dateConverter(date) {
        return new Date(date);
    }

    render(){
        const {isLoading, sessions} = this.state;
        sessions.reverse();

        //See comment about this in SessionData.js
        const determineIfiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


        return(


            <div className="container flex-container-center">


                {
                    !isLoading && sessions.length > 0 ? sessions.map(session => {
                            const {id, createdAt, updatedAt, name, user, startTime, endTime, mapUrl} = session;

                            let mapUrl2 = mapUrl;

                            if(mapUrl2 === "") {
                                mapUrl2 =  fireTrackerLogo;
                            } else {
                                mapUrl2 = "http://" + mapUrl;
                            }
                            const SessionComp = () => (
                                <div className="card session-card padding0px" >
                                    <Link to={`/session/${id}`}>
                                        <div className="session-img-wrapper">
                                            {determineIfiOS ?  (<img className="session-img" src={mapUrl2}/>) : (<ExifOrientationImg className="session-img" src={mapUrl2}/>)}
                                        </div>
                                    </Link>
                                    <div className="padding8px">
                                        <h2 className="roboto-black"> Session: {name}</h2>
                                        <h3>Bruker: {user}</h3>
                                        <h3>Startet: {this.dateConverter(Number(endTime)).toLocaleString()}</h3>
                                    <hr/>
                                        <LinkButton className="flex-align-self-end" color={theme.appWhite} fontColor={theme.colorAccent} text="Åpne" link={`/session/${id}`}/>
                                    </div>
                                </div>
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
