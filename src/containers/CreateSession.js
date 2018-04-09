import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import {Row} from '../components/Row';
import styled from 'styled-components';
import theme from '../theme/theme';
import { Link } from 'react-router-dom'
import LinkButton from '../components/LinkButton'
import AvailBeaconsList from '../components/AvailBeaconsList'
import SelectedBeaconsList from '../components/SelectedBeaconsList'

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

const InputField = styled.input`
    border-bottom: 1px solid;
    border-bottom-color: #fbb033;
    border-top: none;
    border-left: none;
    border-right: none;
    margin: 16px;
    color: #2f2f2f;
    height: 32px;
    font-size: 1.1em;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    width:90%;
    transition: border-bottom-color .3s,  border-bottom .3s;
        ${InputField}:focus {
        outline:none;
        border-bottom: 1px solid;
        border-bottom-color: ${props => props.color};
          }
    `;
class CreateSession extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            createdSession: [],
            sessionName : '',
            sessionUser : '',
            availBeacons : [],
            selectedBeacons : []
        }

    }

    updateSessionName(evt)  {
        this.setState({
            sessionName: evt.target.value
        });
    }

    updateSessionUser(evt) {
        this.setState({
            sessionUser: evt.target.value

        });

    }
    //curl --data 'UUID=fda50693-a4e2-4fb1-afcf-c6eb07647825&&Major=10005&Minor=48406&Name=Ebeoo-gul' http://firetracker.freheims.xyz:8000/beacon
    //curl --data 'UUID=fda50693-a4e2-4fb1-afcf-c6eb07647825&&Major=10010&Minor=48406&Name=Ebeoo-blaa' http://firetracker.freheims.xyz:8000/beacon
    //curl --data 'UUID=fda50693-a4e2-4fb1-afcf-c6eb07647825&&Major=10006&Minor=48406&Name=Ebeoo-raud' http://firetracker.freheims.xyz:8000/beacon

    createSession(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            const session = {
                'Name': this.state.sessionName,
                'User': this.state.sessionUser,
                'Beacons': this.state.selectedBeacons,
            };

            /*formData.append("Name", session["Name"]);
            formData.append("User", session["User"]);
            formData.append("Beacons", session["Beacons"]);*/

            const initConfig = {
                method: 'options',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(session)
            };
            console.log(
                fetch('http://firetracker.freheims.xyz:8000/session', initConfig)
                    .catch(error => console.log('parsing failed', error)));
        }
    }




    selectedAvailBeaconsCallback = (dataFromChild) => {
        this.setState({selectedBeacons : dataFromChild});
    };

    render(){
        return(
            <div>
                <Column offsetLg="4"  xs ="12"  lg="4">


                    <CardOuter>
                        <TitleBar><h2>Create a session - Add name and user</h2> </TitleBar>
                        <Row>
                            <Column xs ="12"  lg="12">
                                <h3>Session Name</h3>
                                <InputField color={theme.colorAccent} placeholder="Name of the session" value={this.state.sessionName} onChange={evt => this.updateSessionName(evt)} />
                                <h3>Session User</h3>
                                <InputField color={theme.colorAccent} placeholder="The session user" value={this.state.sessionUser} onChange={evt => this.updateSessionUser(evt)} />
                            </Column>
                            <Column offsetLg="0"  xs ="12"  lg="4">
                            </Column>

                        </Row>

                    </CardOuter>

                    <CardOuter>
                        <TitleBar><h2>Create a session - Add beacons</h2> </TitleBar>

                        <AvailBeaconsList callback={this.selectedAvailBeaconsCallback}/>

                    </CardOuter>
                </Column>

                <SelectedBeaconsList selectedBeacons = {this.state.selectedBeacons} />
                <Column offsetLg="10"  xs ="12"  lg="2">
                    <LinkButton color={theme.appRed} fontColor={theme.appWhite} text="Back" link="/"/>
                        <button className="green-button" onClick={evt => this.createSession(evt)}>
                            Create
                        </button>
                </Column>
            </div>


        )
    }
}

export default CreateSession;