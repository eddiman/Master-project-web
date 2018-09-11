import React from 'react'
import styled from 'styled-components';
import theme from '../theme/theme';
import AvailBeaconsList from '../components/AvailBeaconsList'
import SelectedBeaconsList from '../components/SelectedBeaconsList'
import * as $ from "jquery";
import HelpButton from "../components/HelpButton";
import Link from "react-router-dom/es/Link";
import desktopToMobile from "../res/img/desktop-to-mobile-color.gif"
import fireTrackerAppLogo from "../res/img/logo_fire_tracker_app.png"
import UserManualCreateSessionComponent from "../components/UserManualCreateSessionComponent";

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
            minNoOfAvailBeacon : 3,

            SummaryDialogShowing : false,
            SessionCreatedDialogShowing : false,
            connectionStatus: false,
            errorMessage : '',
            url : 'http://firetracker.freheims.xyz:8000/session',
            isManualShowing: false

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
                fetch(this.state.url, initConfig)
                    .then(this.setState({
                        connectionStatus: true
                    }))
                    .catch(error => this.setState({
                            connectionStatus: false,
                            errorMessage: error.toString()
                        })
                    )
            );

            this.setState({
                SummaryDialogShowing : false,
                SessionCreatedDialogShowing : true

            });

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

    userManualCallback = () => {
        this.setState({isManualShowing : false});

    };


    clearBeaconsCallback = () => {
        let tempArray = this.state.selectedBeacons;

        tempArray.forEach((beacon) => {
                beacon.XCoordinate = null;
            }
        );
        this.setState({selectedBeacons : tempArray});

    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };


    closeDialog = (evt, dialog) => {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            switch (dialog) {
                case "summary":
                    this.setState({SummaryDialogShowing : false});
                    break;

                case "sessionCreated":
                    this.setState({SessionCreatedDialogShowing : false});
                    this.props.history.push('/');
                    break;

                case "newSameSession":
                    this.setState({SessionCreatedDialogShowing : false});
                    this.TopCreateSessionRef.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

                    break;

                case "tryAgain":
                    this.setState({SessionCreatedDialogShowing : false});
                    this.createSession(evt);

                    break;

            }


        }
    };

    openDialog = (evt, dialog) => {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            switch (dialog) {
                case "summary":
                    this.setState({SummaryDialogShowing : true});
                    break;

                case "sessionCreated":
                    this.setState({SessionCreatedDialogShowing : true});
                    break;

            }


        }
    };

    openLocalManual = (evt) => {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            this.setState({isManualShowing : true});

        }
    };




    render(){
        const noScrollStyle = {overflow : "hidden"};

        const LocalHelpButton = () =>
            <div className="manual-blue-fixed-button flex-align-self-end margin24px" onClick={evt => {this.openLocalManual(evt)}}>
                <i className="material-icons md-36">help_outline</i>
            </div>;

        const SummaryDialogMessage = () =>
            <div className="dark-dialog-bg fade-in container flex-align-items-center flex-container-horizontal-center" onClick={evt => this.closeDialog(evt, "summary")}>
                <div className="card max-width-600px min-width-300px padding8px">


                    <h2 className="roboto-black flex-align-self-start">Oppsummering</h2>
                    <p><b>Øktnavn: </b>{this.state.sessionName}</p>
                    <p><b>Øktbruker: </b>{this.state.sessionUser}</p>
                    <p><b>Antall valgte beaconer: </b>{this.state.selectedBeacons.length}</p>

                    {this.checkIfDataIsFilledOut() ? ''
                        : <p>Ikke alle valgte beaconer er plassert på kartet</p>}

                    <div className="container flex-container-row-direction flex-container-center">
                        {this.checkIfDataIsFilledOut() ? <div className= "create-session-btn flex-2 flex-2 margin8px" onClick={evt => this.createSession(evt)}> Opprett</div>
                            : ''}


                        <div className= "btn-red-color flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "summary")}> Lukk </div>
                    </div>
                </div>
            </div>;


        const SessionCreatedDialogMessage = () =>
            <div className="dark-dialog-bg fade-in container flex-align-items-center flex-container-horizontal-center">
                <div className="card max-width-600px min-width-300px ">
                    {this.state.connectionStatus ? <div className="container flex-container-center flex-container-column-direction padding8px">

                        <h2 className="roboto-black flex-align-self-start">Økten ble opprettet</h2>
                        <img className="go-to-mobile" src={desktopToMobile} alt="go-to-mobile"/>
                        <p>Åpne "{this.state.sessionName}"-økten på FireTracker-appen for Android</p>

                        <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "newSameSession")}> Lag lik økt </div>
                        <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "sessionCreated")}> Gå til hovedsiden</div>
                    </div>
                        :
                        <div className="container flex-container-center flex-container-column-direction padding8px">

                            <h2 className="roboto-black flex-align-self-start">Økten ble IKKE opprettet</h2>
                            <i className="material-icons md-72 lighter">cancel_presentation</i>
                            <p>Noe gikk galt...</p>
                            <p>Feilmelding: {this.state.errorMessage}</p>
                            <p>Sjekk tilkoblingen eller kontakt systemadministrator</p>

                            <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "tryAgain")}> Prøv igjen </div>
                            <div className= "btn-red-color flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "newSameSession")}> Lukk</div>
                        </div>}
                </div>

            </div>;


        return(
            <div className="rounded-container" style = {this.state.isManualShowing ? noScrollStyle: noScrollStyle}>
                {this.state.SummaryDialogShowing ? <SummaryDialogMessage/> : ''}
                {this.state.SessionCreatedDialogShowing ? <SessionCreatedDialogMessage/> : ''}
                {this.state.isManualShowing ? <UserManualCreateSessionComponent callback={this.userManualCallback}/> : ''}


                <div className="container " ref={(el) => { this.TopCreateSessionRef = el;}}>
                    <h1 className="margin24px fade-in roboto-black">Lag en økt</h1>
                </div>
                <div className="container flex-align-items-center flex-container-column-direction">

                    {/************************* Name and user input*****************************/}

                    <div className="card fade-in flex-1 max-width-600px min-width-600px-m " >


                        <div>
                            <h2>Navn på økten</h2>
                            {this.state.sessionName.length < this.state.minLengthOfStringInput ?
                                (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Øktnavnet må ha <b>
                                    {(this.state.minLengthOfStringInput - this.state.sessionName.length)}</b> tegn til.</p>) :
                                <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Navnet  er godkjent</p>}

                            <InputField color={theme.colorAccent} placeholder="Skriv et gjenkjennelig navn til økten" value={this.state.sessionName}
                                        onChange={evt => this.updateSessionName(evt)} />
                            <h2>Navn på den som skal utføre økten</h2>
                            {this.state.sessionUser.length < this.state.minLengthOfStringInput ?
                                (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Navnet på brukeren må ha <b>
                                    {(this.state.minLengthOfStringInput - this.state.sessionUser.length)}</b> tegn til.</p>) :
                                <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Navnet er godkjent</p>}


                            <InputField color={theme.colorAccent} placeholder="Skriv inn navnet på den som skal trackes" value={this.state.sessionUser}
                                        onChange={evt => this.updateSessionUser(evt)} />
                        </div>
                        {this.state.isSessionNameLongEnough &&  this.state.isSessionUserLongEnough && !this.state.isNameInputted
                            ?

                            <div className="create-session-btn flex-2" onClick={evt => this.showAvailBeacons(evt)}> Neste </div> : ''}

                    </div>

                    {/************************* ^Name and user input^^ *****************************/}


                    {this.state.isNameInputted ?  <div className="card fade-in max-height-600 min-width-600px-m flex-2" ref={(el) => { this.AvailBeaconsRef = el;}}>
                        <h2>Legg til beaconer for "{this.state.sessionName}"-økten</h2>
                        {this.state.selectedBeacons.length < this.state.minNoOfAvailBeacon ?
                            (<p>Økten må ha minst <b>
                                {(this.state.minNoOfAvailBeacon - this.state.selectedBeacons.length)}</b> beaconer til</p>) :
                            <p>Du har lagt til {this.state.selectedBeacons.length} beaconer</p>}


                        <AvailBeaconsList callback={this.selectedAvailBeaconsCallback}/>


                        <hr/>


                        {this.state.selectedBeacons.length > 2
                            ?

                            <div className="create-session-btn flex-2 " onClick={evt => this.showUploadMap(evt)}> Neste </div> : ''}

                    </div> : ''}


                    {this.state.isBeaconsSelected ?  <div ref={(el) => { this.mapUpload = el; }} className="card fade-in max-height-600 max-width-600px min-width-600px-m flex-2">
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
                        <SelectedBeaconsList selectedBeacons = {this.state.selectedBeacons} mapImgUrl = {this.state.mapImgUrl} clearBeaconsCallback={this.clearBeaconsCallback}/>
                        : ''}

                    <div className="fixed-footer-menu  ">

                        <Link to={"/"}>
                            <div className="arrow-back-btn">
                                <i className="material-icons md-36">keyboard_arrow_left</i>
                            </div>
                        </Link>


                        <div className={this.state.isNameInputted && this.state.isBeaconsSelected && this.state.isMapUploaded?
                            "create-session-btn flex-2" : 'no-visibility create-session-btn flex-2' } onClick={evt => this.openDialog(evt, "summary")}> Opprett </div>

                    </div>

                    <div className="fixing-the-fixed-footer-shit"/>
                </div>
                <LocalHelpButton/>

            </div>
        )





    }

}

export default CreateSession;
