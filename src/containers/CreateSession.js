import React from 'react'
import styled from 'styled-components';
import theme from '../theme/theme';
import LinkButton from '../components/LinkButton'
import AvailBeaconsList from '../components/AvailBeaconsList'
import SelectedBeaconsList from '../components/SelectedBeaconsList'
import * as $ from "jquery";
import HelpButton from "../components/HelpButton";
import Link from "react-router-dom/es/Link";

const InputField = styled.input`
        border-bottom: 1px solid;
        border-bottom-color: #fbb033;
        border-top: none;
        border-left: none;
        border-right: none;
        margin: 16px;
        color: #2f2f2f;
        border-radius: 3px;
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
            placedBeacons : [],
            selectedBeacons : [],
            mapImgUrl : '',

            isSessionNameLongEnough : false,
            isSessionUserLongEnough : false,

            isNameInputted : false,
            isBeaconsSelected : false,
            isMapUploaded : false,
            isBeaconsPlaced : false,

            minLengthOfStringInput : 5,
            minNoOfAvailBeacon : 3

        }
    }

    updateSessionName(evt)  {
        this.setState({
            sessionName: evt.target.value
        });
        if (evt.target.value.length >= this.state.minLengthOfStringInput) {
            this.setState({
                isSessionUserLongEnough: true
            });
        } else {
            this.setState({
                isSessionUserLongEnough: false
            });
        }

    }

    updateSessionUser(evt) {
        this.setState({
            sessionUser: evt.target.value
        });
        if (evt.target.value.length >= this.state.minLengthOfStringInput) {
            this.setState({
                isSessionNameLongEnough: true
            });
        } else {
            this.setState({
                isSessionNameLongEnough: false
            });
        }

    }

    showAvailBeacons(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.setState({
                isNameInputted: true
            });

            setTimeout( () => {
                this.AvailBeaconsRef.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

            }, 300);



        }
    }

    showUploadMap(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.setState({
                isBeaconsSelected: true
            });

            setTimeout( () => {
                this.mapUpload.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

            }, 300);
        }
    }



            //curl --data 'UUID=fda50693-a4e2-4fb1-afcf-c6eb07647825&&Major=10005&Minor=48406&Name=Ebeoo-gul' http://firetracker.freheims.xyz:8000/beacon
    //curl --data 'UUID=fda50693-a4e2-4fb1-afcf-c6eb07647825&&Major=10010&Minor=48406&Name=Ebeoo-blaa' http://firetracker.freheims.xyz:8000/beacon
    //curl --data 'UUID=fda50693-a4e2-4fb1-afcf-c6eb07647825&&Major=10006&Minor=48406&Name=Ebeoo-raud' http://firetracker.freheims.xyz:8000/beacon

    createSession(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            if(this.checkIfDataIsFilledOut()) {
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
                alert("Session'en ble opprettet");
            } else {
                alert("Du må sette alle valgte beacons ut på kartet.");

            }

        }
    }

    checkIfSelectedBeaconsHasCoords(){

        let count = 0;
        for (let i = 0; i < this.state.selectedBeacons.length; i++) {
            if (this.state.selectedBeacons[i].XCoordinate > 0) {
                count++;
            }
        }
        return count === this.state.selectedBeacons.length;
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

    checkIfDataIsFilledOut() {

        return this.checkIfSelectedBeaconsHasCoords();
    }


    selectedAvailBeaconsCallback = (dataFromChild) => {
        this.setState({selectedBeacons : dataFromChild});
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };



    render(){

        console.log(this.state.selectedBeacons);

        console.log("all data: " +this.checkIfDataIsFilledOut());
        console.log("all beacons: "+ this.checkIfSelectedBeaconsHasCoords());

        return(
            <div className="rounded-container">
                <div className="container ">
                    <h1 className="margin24px fade-in roboto-black">Lag en økt</h1>
                </div>
                <div className="container flex-align-items-center flex-container-column-direction">

                    {/************************* Name and user input*****************************/}

                    <div className="card fade-in flex-1 max-width-600 min-width-600-m " >



                        <div>
                            <h2>Navn på økten</h2>
                            {this.state.sessionName.length < this.state.minLengthOfStringInput ?
                                (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300">Øktnavnet må ha <b>
                                    {(this.state.minLengthOfStringInput - this.state.sessionName.length)}</b> tegn til.</p>) :
                                <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300">Navnet  er godkjent</p>}

                            <InputField color={theme.colorAccent} placeholder="Skriv et gjenkjennelig navn til session'en" value={this.state.sessionName}
                                        onChange={evt => this.updateSessionName(evt)} />
                            <h2>Navn på den som skal utføre økten</h2>
                            {this.state.sessionUser.length < this.state.minLengthOfStringInput ?
                                (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300">Navnet på brukeren må ha <b>
                                    {(this.state.minLengthOfStringInput - this.state.sessionUser.length)}</b> tegn til.</p>) :
                                <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300">Navnet er godkjent</p>}


                            <InputField color={theme.colorAccent} placeholder="Skriv inn navnet på den som skal trackes" value={this.state.sessionUser}
                                        onChange={evt => this.updateSessionUser(evt)} />
                        </div>
                        {this.state.isSessionNameLongEnough &&  this.state.isSessionUserLongEnough && !this.state.isNameInputted
                            ?

                            <div className="create-session-btn flex-2" onClick={evt => this.showAvailBeacons(evt)}> Neste </div> : ''}

                    </div>

                    {/************************* ^Name and user input^^ *****************************/}


                    {this.state.isNameInputted ?  <div className="card fade-in max-height-600 min-width-600-m flex-2" ref={(el) => { this.AvailBeaconsRef = el;}}>
                        <h2>Legg til beacons for "{this.state.sessionName}"-økten</h2>
                        {this.state.selectedBeacons.length < this.state.minNoOfAvailBeacon ?
                            (<p>Økten må ha minst <b>
                                {(this.state.minNoOfAvailBeacon - this.state.selectedBeacons.length)}</b> beacons til</p>) :
                            <p>Du har lagt til {this.state.selectedBeacons.length} beacons</p>}


                        <AvailBeaconsList callback={this.selectedAvailBeaconsCallback}/>


                        <hr/>


                        {this.state.selectedBeacons.length > 2
                            ?

                            <div className="create-session-btn flex-2 " onClick={evt => this.showUploadMap(evt)}> Neste </div> : ''}

                    </div> : ''}


                    {this.state.isBeaconsSelected ?  <div ref={(el) => { this.mapUpload = el; }} className="card fade-in max-height-600 max-width-600 min-width-600-m flex-2">
                        <h2>{this.state.isMapUploaded ? 'Last opp et annet kartbilde' : 'Last opp et kartbilde'}</h2>
                        <input id="myInput"
                               type="file"
                               ref={(ref) => this.upload = ref}
                               style={{display: 'none'}}
                               onChange={this.onChangeFile.bind(this)}
                        />
                            <div ref={(el) => { this.messagesEnd = el; }} className = 'create-session-btn'
                                 label="Open File"
                                 onClick={()=>{this.upload.click()}}>
                                {this.state.isMapUploaded ? 'Last opp ny fil' : 'Last opp fil'}
                            </div>
                        </div> : '' }



                    <div className="fixing-the-fixed-footer-shit"/>

                    {this.state.isMapUploaded ?
                        <SelectedBeaconsList selectedBeacons = {this.state.selectedBeacons} mapImgUrl = {this.state.mapImgUrl}/>
                    : ''}

                    <div className="fixed-footer-menu  ">

                        <Link to={"/"}>
                            <div className="arrow-back-btn">
                                <i className="material-icons md-36">keyboard_arrow_left</i>
                            </div>
                        </Link>


                                <div className={this.state.isNameInputted && this.state.isBeaconsSelected && this.state.isMapUploaded?
                                    "create-session-btn flex-2" : 'no-visibility create-session-btn flex-2' } onClick={evt => this.createSession(evt)}> Opprett </div>

                    </div>

                    <div className="fixing-the-fixed-footer-shit"/>
                </div>
                <HelpButton toUrl={'/manual/create/1'} fromUrl={this.props.location.pathname}/>
            </div>
        )





    }

}

export default CreateSession;
