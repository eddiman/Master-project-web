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
            selectedBeacons : [],
            isMapUploaded : false,
            mapImgUrl : ''
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

            const beaconArray = this.state.selectedBeacons;

            for(let i = 0; i < beaconArray.length; i++) {
                delete beaconArray[i].id;
                console.log(beaconArray[i]);
            }


            const session = {
                'Name': this.state.sessionName,
                'User': this.state.sessionUser,
                'Beacons': beaconArray
                ,
            };

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


    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        console.log(file);
        //this.setState({mapImgFile : file}); /// if you want to upload latter

        this.uploadFile(file);
    }

    uploadFile(file){
        let formData = new FormData();
        //const blobImg = new Blob(file, {type: "image/png"});
        formData.append('Map', file);


        const initConfig = {
            method: 'options',
            headers: {
                // 'Accept': 'application/json',
                //'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded'
                //'Content-Type': 'multipart/form-data;',
                //'enctype' : 'multipart/form-data'

            },
            body: file
        };
        console.log(
            fetch('http://firetracker.freheims.xyz:8000/map', initConfig)
                .then(response => console.log(response))
                .catch(error => console.log('parsing failed', error)));

      /*  const xhr = new XMLHttpRequest();


        xhr.open('OPTIONS', 'http://firetracker.freheims.xyz:8000/map', true);

        xhr.send(formData);  // multipart/form-data

        this.setState({
            isMapUploaded: true
        });

        if (this.state.isMapUploaded) {
        setTimeout(() => {
            this.scrollToBottom();

        }, 300);}*/


    }


    selectedAvailBeaconsCallback = (dataFromChild) => {
        this.setState({selectedBeacons : dataFromChild});
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };



    render(){


        const selectMapBeaconsDiv = () => {
            return (
                <div >
                    <SelectedBeaconsList selectedBeacons = {this.state.selectedBeacons} />

                    <Column offsetLg="10"  xs ="12"  lg="2">
                        <LinkButton color={theme.appRed} fontColor={theme.appWhite} text="Back" link="/"/>
                        <button className="green-button" onClick={evt => this.createSession(evt)}>
                            Create
                        </button>
                    </Column>
                </div>
            )
        };


        return(
            <div >
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

                    <CardOuter >
                        <TitleBar><h2 >Create a session - Add beacons</h2> </TitleBar>

                        <AvailBeaconsList ref={(el) => { this.messagesEnd = el; }} callback={this.selectedAvailBeaconsCallback}/>
                        <Row>
                            <h4> You need to upload a map image to continue. (It has to be 1:1 ratio)</h4>
                            <input id="myInput"
                                   type="file"
                                   ref={(ref) => this.upload = ref}
                                   style={{display: 'none'}}
                                   onChange={this.onChangeFile.bind(this)}
                            />

                            <div ref={(el) => { this.messagesEnd = el; }} className = {this.state.isMapUploaded ? 'green-button' : 'red-button'}
                                 label="Open File"
                                 onClick={()=>{this.upload.click()}}>
                                Upload file
                            </div></Row>


                    </CardOuter>
                </Column>

                {this.state.isMapUploaded ? selectMapBeaconsDiv() : ''}
            </div>

        )





    }

}

export default CreateSession;