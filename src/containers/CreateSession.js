import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import styled from 'styled-components';
import theme from '../theme/theme';
import LinkButton from '../components/LinkButton'
import AvailBeaconsList from '../components/AvailBeaconsList'
import SelectedBeaconsList from '../components/SelectedBeaconsList'
import * as $ from "jquery";

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
                'Beacons': beaconArray,
                'Map' : this.state.mapImgUrl
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
            alert("Session created")
        }
    }


    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        let file = event.target.files[0];
        console.log(file);
        this.uploadFile(file);
    }

    uploadFile(file){
        let formData = new FormData();
        formData.append('Map', file);
        const fullUrl = "http://firetracker.freheims.xyz:8000/map";

        $.ajax({
            method: "POST",
            url: fullUrl,
            data: formData,
            dataType: 'json',
            cache: false,
            processData: false,
            contentType: false
        }).done((data) => {
            console.log(data);
            this.setState({
                mapImgUrl: data.Url,
                isMapUploaded : true,

            });

            //resolve(data);
        }).fail((err) => {
            console.log("errorrr for file upload", err);
            //reject(err);
        });

        setTimeout( () => {
            this.scrollToBottom();

        }, 300);



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
                    <SelectedBeaconsList selectedBeacons = {this.state.selectedBeacons} mapImgUrl = {this.state.mapImgUrl}/>
                </div>
            )
        };
        console.log(this.state.selectedBeacons);


        return(
            <div className="rounded-container">
                <div className="container">

                    <div className="card fade-in flex-1 min-width-300 ">
                        <div>
                            <h1 className="font-header">Create a session</h1>
                            <hr/>
                            <h2>Instructions</h2>
                            <p>To properly create a new session please follow these instructions:</p>
                            <ol>
                                <li>Give the session a name and input the name of the person who will be performing the session.</li>
                                <li>Select the beacons you want to use in this session.</li>
                                <li>Click "UPLOAD FILE" and select an image to be used as a map.</li>
                                <li>Select a beacon from the left panel and click on the map where you want to place it.</li>
                                <li>When all desired beacons are placed, click the green "CREATE"-button in the left corner to create the session.</li>
                            </ol>
                            <p>Session will then show up in the mobile application.</p>
                        </div>
                    </div>
                    <div className="card fade-in flex-1 max-height-300 min-width-300 ">



                        <div>
                            <h3>Session Name</h3>
                            <InputField color={theme.colorAccent} placeholder="Name of the session" value={this.state.sessionName} onChange={evt => this.updateSessionName(evt)} />
                            <h3>Session User</h3>
                            <InputField color={theme.colorAccent} placeholder="The session user" value={this.state.sessionUser} onChange={evt => this.updateSessionUser(evt)} />
                        </div>
                    </div>

                    <div className="card fade-in max-height-600 min-width-300 flex-2">

                        <AvailBeaconsList callback={this.selectedAvailBeaconsCallback}/>

                        <h4> You need to upload a map image to continue. (It has to be 1:1 ratio)</h4>
                        <input id="myInput"
                               type="file"
                               ref={(ref) => this.upload = ref}
                               style={{display: 'none'}}
                               onChange={this.onChangeFile.bind(this)}
                        />
                        <hr/>
                        <div ref={(el) => { this.messagesEnd = el; }} className = {this.state.isMapUploaded ? 'green-button' : 'red-button'}
                             label="Open File"
                             onClick={()=>{this.upload.click()}}>
                            Upload file
                        </div>


                    </div>
                    <div className="fixing-the-fixed-footer-shit"/>

                    {this.state.isMapUploaded ? selectMapBeaconsDiv() : ''}

                    <div className="fixed-create-session-menu">
                        <LinkButton color={theme.appRed} fontColor={theme.appWhite} text="Back" link="/"/>

                        <button className="green-button" onClick={evt => this.createSession(evt)}>
                            Create session
                        </button>
                    </div>

                    <div className="fixing-the-fixed-footer-shit"/>
                </div>
            </div>
        )





    }

}

export default CreateSession;
