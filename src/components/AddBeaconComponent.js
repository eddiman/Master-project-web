import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../res/img/logo_fire_tracker.png"
import openSessionImg from "../res/img/open-session-splash.jpg"
import createSessionImg from "../res/img/create-session-splash.jpg"
import Styled from "styled-components";
import HelpButton from "./HelpButton";
import theme from "../theme/theme";

import styled from 'styled-components';


const InputField = styled.input`
        border-bottom: 1px solid;
        border-bottom-color: #fbb033;
        border-top: none;
        border-left: none;
        border-right: none;
        margin: 16px;
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
class AddBeaconComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /*Adding av beacons*/
            beaconName : '',
            beaconUuid : '',
            beaconMajor : '',
            beaconMinor : '',

            isBeaconNameLongEnough : false,
            isBeaconUuidLongEnough : false,
            isBeaconMajorLongEnough : false,
            isBeaconMinorLongEnough : false,

            minLengthOfStringInput : 5,
            minLengthOfBeaconUuidInput : 36,
            minLengthOfBeaconMajorInput : 5,
            minLengthOfBeaconMinorInput : 5,

            SummaryDialogShowing : false,

            connectionStatus: false,
            errorMessage : '',
            url : 'http://firetracker.freheims.xyz:8000/beacon',




        }
    }
    /**Adding av beacons vv*/
    createBeacon(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            const beacon = {
                'Name': this.state.beaconName,
                'UUID': this.state.beaconUuid,
                'Major': this.state.beaconMajor,
                'Minor' : this.state.beaconMinor
                ,
            };

            const initConfig = {
                method: 'options',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(beacon)
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
                BeaconCreatedDialogShowing : true

            });

        }
    }


    updateBeaconName(evt)  {
        this.setState({
            beaconName: evt.target.value
        });
        if (evt.target.value.length >= this.state.minLengthOfStringInput) {
            this.setState({
                isBeaconNameLongEnough: true
            });
        } else {
            this.setState({
                isBeaconNameLongEnough: false
            });
        }

    }
    updateBeaconUuid(evt)  {
        this.setState({
            beaconUuid: evt.target.value
        });
        if (evt.target.value.length >= this.state.minLengthOfBeaconUuidInput) {
            this.setState({
                isBeaconUuidLongEnough: true
            });
        } else {
            this.setState({
                isBeaconUuidLongEnough: false
            });
        }

    }
    updateBeaconMajor(evt)  {
        this.setState({
            beaconMajor: evt.target.value
        });
        if (evt.target.value.length >= this.state.minLengthOfBeaconMajorInput) {
            this.setState({
                isBeaconMajorLongEnough: true
            });
        } else {
            this.setState({
                isBeaconMajorLongEnough: false
            });
        }

    }

    updateBeaconMinor(evt)  {
        this.setState({
            beaconMinor: evt.target.value
        });
        if (evt.target.value.length >= this.state.minLengthOfBeaconMinorInput) {
            this.setState({
                isBeaconMinorLongEnough: true
            });
        } else {
            this.setState({
                isBeaconMinorLongEnough: false
            });
        }

    }


    openDialog = (evt, dialog) => {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            switch (dialog) {
                case "summary":
                    this.setState({SummaryDialogShowing : true});
                    break;

                case "beaconCreated":
                    this.setState({BeaconCreatedDialogShowing : true});
                    break;

            }


        }
    };


    closeDialog = (evt, dialog) => {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            switch (dialog) {
                case "summary":
                    this.setState({SummaryDialogShowing : false});
                    break;

                case "tryAgain":
                    this.setState({BeaconCreatedDialogShowing : false});
                    this.createBeacon(evt);

                    break;


                case "newBeacon":
                    this.setState({
                        beaconName : '',
                        beaconUuid : '',
                        beaconMajor : '',
                        beaconMinor : '',
                        BeaconCreatedDialogShowing : false
                    });
                    break;

                case "cancel":
                    this.setState({
                        BeaconCreatedDialogShowing : false,
                        SummaryDialogShowing : false
                    });
                    break;

            }


        }
    };

    /***Adding av beacons ^^***/


    render(){
// fda50693-a4e2-4fb1-afcf-c6eb07647825

        const SummaryDialogMessage = () =>
            <div className="dark-dialog-bg fade-in container flex-align-items-center flex-container-horizontal-center" onClick={evt => this.closeDialog(evt, "summary")}>
                <div className="card max-width-600px min-width-300px padding8px">


                    <h2 className="roboto-black flex-align-self-start">Oppsummering</h2>
                    <p><b>Beaconnavn: </b>{this.state.beaconName}</p>
                    <p><b>UUID: </b>{this.state.beaconUuid}</p>
                    <p><b>Major: </b>{this.state.beaconMajor}</p>
                    <p><b>Minor: </b>{this.state.beaconMinor}</p>

                    <div className="container flex-container-row-direction flex-container-center">
                        <div className= "create-session-btn flex-2 flex-2 margin8px" onClick={evt => this.createBeacon(evt)}> Opprett</div>
                        <div className= "btn-red-color flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "cancel")}> Lukk </div>
                    </div>

                </div>
            </div>;

        const BeaconCreatedDialogMessage = () =>
            <div className="dark-dialog-bg fade-in container flex-align-items-center flex-container-horizontal-center">
                <div className="card max-width-600px min-width-300px ">
                    {this.state.connectionStatus ? <div className="container flex-container-center flex-container-column-direction padding8px">

                            <h2 className="roboto-black flex-align-self-start">Økten ble opprettet</h2>
                            <i className="material-icons md-72 lighter">bluetooth</i>
                            <p>Beaconet "{this.state.beaconName}" ble lagt til</p>

                            <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "newBeacon")}> Lag ny beacon </div>
                            <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "cancel")}> Lukk</div>
                        </div>
                        :
                        <div className="container flex-container-center flex-container-column-direction padding8px">

                            <h2 className="roboto-black flex-align-self-start">Beaconet ble IKKE opprettet</h2>
                            <i className="material-icons md-72 lighter">cancel_presentation</i>
                            <p>Noe gikk galt...</p>
                            <p>Feilmelding: {this.state.errorMessage}</p>
                            <p>Sjekk tilkoblingen eller kontakt systemadministrator</p>

                            <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "tryAgain")}> Prøv igjen </div>
                            <div className= "btn-red-color flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "cancel")}> Lukk</div>
                        </div>}
                </div>

            </div>;

        return(

            <div className="rounded-container">


                {this.state.SummaryDialogShowing ? <SummaryDialogMessage/> : ''}
                {this.state.BeaconCreatedDialogShowing ? <BeaconCreatedDialogMessage/> : ''}

                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Legg til beacon</h1>
                </div>

                <div className="container flex-align-items-center flex-container-column-direction">

                    <div className="card fade-in flex-1 max-width-600px min-width-600px-m " >
                        <h2 className="margin24px roboto-black ">Legge til ny beacon</h2>


                        <div className="container flex-container-center min-width-600px-m fade-in padding0px border-radius15px">

                            <div className="min-width-600px-m">
                                <h2>Legg til beaconnavn</h2>
                                {this.state.beaconName.length < this.state.minLengthOfStringInput ?
                                    (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Beaconnavnet må ha <b>
                                        {(this.state.minLengthOfStringInput - this.state.beaconName.length)}</b> tegn til.</p>) :
                                    <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Navnet  er godkjent</p>}

                                <InputField color={theme.colorAccent} placeholder="Skriv et gjenkjennelig navn til beaconet" value={this.state.beaconName}
                                            onChange={evt => this.updateBeaconName(evt)} />


                                <h2>Skriv inn UUID</h2>
                                {this.state.beaconUuid.length < this.state.minLengthOfBeaconUuidInput ?
                                    (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300px">UUID må ha <b>
                                        {(this.state.minLengthOfBeaconUuidInput - this.state.beaconUuid.length)}</b> tegn til.</p>) :
                                    <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300px">UUIDen er godkjent</p>}


                                <InputField color={theme.colorAccent} placeholder="Skriv inn beaconet sin UUID" value={this.state.beaconUuid}
                                            onChange={evt => this.updateBeaconUuid(evt)} />

                                <h2>Skriv inn Major</h2>
                                {this.state.beaconMajor.length < this.state.minLengthOfBeaconMajorInput ?
                                    (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Major-verdien må ha <b>
                                        {(this.state.minLengthOfBeaconMajorInput - this.state.beaconMajor.length)}</b> tegn til.</p>) :
                                    <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Major-verdien er godkjent</p>}


                                <InputField color={theme.colorAccent} placeholder="Skriv inn beaconet sin Major" value={this.state.beaconMajor}
                                            onChange={evt => this.updateBeaconMajor(evt)} />

                                <h2>Skriv inn Minor</h2>
                                {this.state.beaconMinor.length < this.state.minLengthOfBeaconMinorInput ?
                                    (<p className="avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Minor-verdien må ha <b>
                                        {(this.state.minLengthOfBeaconMinorInput - this.state.beaconMinor.length)}</b> tegn til.</p>) :
                                    <p className="beacon-element-marked avail-beacon-element padding8px center-align-text margin-auto max-width-300px">Minor-verdien er godkjent</p>}


                                <InputField color={theme.colorAccent} placeholder="Skriv inn beaconet sin Major" value={this.state.beaconMinor}
                                            onChange={evt => this.updateBeaconMinor(evt)} />

                                <div className={this.state.isBeaconNameLongEnough && this.state.isBeaconUuidLongEnough && this.state.isBeaconMajorLongEnough && this.state.isBeaconMinorLongEnough?
                                    "create-session-btn flex-2 fade-in" : 'no-visibility create-session-btn flex-2' } onClick={evt => this.openDialog(evt, "summary")}> Opprett </div>
                            </div>


                        </div>

                    </div>
                </div>
                <div className="fixing-the-fixed-footer-shit" />

                <div className="fixed-footer-menu flex-container-align-start">

                    <Link to={"/beacons"}>
                        <div className="arrow-back-btn ">
                            <i className="material-icons md-36">keyboard_arrow_left</i>
                        </div>
                    </Link>

                </div>
                <HelpButton toUrl={'/manual/open/1'} fromUrl={this.props.location.pathname}/>
            </div>

        )
    }
}

export default AddBeaconComponent;