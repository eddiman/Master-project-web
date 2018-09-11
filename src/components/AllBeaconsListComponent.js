import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../res/img/logo_fire_tracker.png"
import openSessionImg from "../res/img/open-session-splash.jpg"
import createSessionImg from "../res/img/create-session-splash.jpg"
import Styled from "styled-components";
import HelpButton from "./HelpButton";
import theme from "../theme/theme";

import styled from 'styled-components';


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
class AllBeaconsListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            beacons: [],
            selectedBeacon : [],

            SummaryDialogShowing : false,
            BeaconDeletedDialogShowing : false,

            connectionStatus: false,
            errorMessage : '',
            url : 'http://firetracker.freheims.xyz:8000/',




        }
    }
    componentDidMount(){
        this.fetchAllBeacons();


    }



    fetchAllBeacons(){

        this.setState({
            isLoading: true,
            beacons: []
        });


        fetch(this.state.url + "beacons")
            .then(response => response.json())

            .then(parsedJSON => parsedJSON.map(beacon => (
                {
                    id: `${beacon.ID}`,
                    name: `${beacon.Name}`,
                    uuid: `${beacon.UUID}`,
                    major: `${beacon.Major}`,
                    minor: `${beacon.Minor}`
                }
            )))
            .then(beacons => this.setState({
                beacons,
                isLoading: false
            }))
            .catch(error => console.log('parsing failed', error))
    }


    deleteBeacon(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            const id = this.state.selectedBeacon.id;
            let formData = new FormData;
            console.log(id);
            formData.append("Id", id);
            console.log(formData);

            const initConfig = {
                method: 'POST',
                body: formData,
            };

            /**
             *  .then(response => this.setState({
                            connectionStatus: true
                        })**/
            console.log(
                fetch(this.state.url + "beacon/delete", initConfig)
                    .then(this.setState({
                            connectionStatus: true

                        })

                    )
                    .catch(error => this.setState({
                            connectionStatus: false,
                            errorMessage: error.toString()
                        })
                    ));


            this.setState({
                SummaryDialogShowing : false,
                BeaconDeletedDialogShowing : true

            });

        }
    }

    removeBeacon(id) {

        let newSelectedBeacons = this.state.beacons;
        console.log("remove2222");

        for (let i = 0; i < newSelectedBeacons.length; i++) {
            if(newSelectedBeacons[i].id === id) {
                newSelectedBeacons.splice(i, 1);
                this.setState({
                    beacons : newSelectedBeacons
                });

            }
        }

    }



    openDialog = (evt, dialog, beacon) => {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {
            switch (dialog) {
                case "summary":
                    this.setState({SummaryDialogShowing : true});
                    this.setState({selectedBeacon : beacon});
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
                    this.setState({BeaconDeletedDialogShowing : false});
                    this.deleteBeacon(evt);

                    break;

                case "cancel":
                    this.setState({
                        SummaryDialogShowing : false,
                        BeaconDeletedDialogShowing : false,
                        connectionStatus : false
                    });
                    break;

            }


        }
    };

    /***Adding av beacons ^^***/


    render(){
// fda50693-a4e2-4fb1-afcf-c6eb07647825
        if (this.state.connectionStatus) {
            console.log("remove");
            this.removeBeacon(this.state.selectedBeacon.id);

        }
        const {isLoading, beacons} = this.state;

        const SummaryDialogMessage = () =>
            <div className="dark-dialog-bg fade-in container flex-align-items-center flex-container-horizontal-center" onClick={evt => this.closeDialog(evt, "summary")}>
                <div className="card max-width-600px min-width-300px padding8px">


                    <h2 className="roboto-black flex-align-self-start">Oppsummering</h2>
                    <p><b>Beaconnavn: </b>{this.state.selectedBeacon.name}</p>
                    <p><b>UUID: </b>{this.state.selectedBeacon.uuid}</p>
                    <p><b>Major: </b>{this.state.selectedBeacon.major}</p>
                    <p><b>Minor: </b>{this.state.selectedBeacon.minor}</p>

                    <div className="container flex-container-row-direction flex-container-center">
                        <div className= "btn-red-color flex-2 flex-2 margin8px" onClick={evt => this.deleteBeacon(evt)}> Slett</div>
                        <div className= "create-session-btn flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "cancel")}> Lukk </div>
                    </div>

                </div>
            </div>;

        const BeaconDeletedDialogMessage = () =>
            <div className="dark-dialog-bg fade-in container flex-align-items-center flex-container-horizontal-center">
                <div className="card max-width-600px min-width-300px ">
                    {this.state.connectionStatus ? <div className="container flex-container-center flex-container-column-direction padding8px">

                            <h2 className="roboto-black flex-align-self-start">Beaconet ble slettet</h2>
                            <i className="material-icons md-72 lighter">bluetooth</i>
                            <p>Beaconet "{this.state.selectedBeacon.name}" ble slettet til</p>

                            <div className= "btn-rounded flex-2 flex-2 margin8px" onClick={evt => this.closeDialog(evt, "cancel")}> Lukk</div>
                        </div>
                        :
                        <div className="container flex-container-center flex-container-column-direction padding8px">

                            <h2 className="roboto-black flex-align-self-start">Beaconet ble IKKE slettet</h2>
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
                {this.state.BeaconDeletedDialogShowing ? <BeaconDeletedDialogMessage/> : ''}

                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Liste over beaconer</h1>
                </div>

                <div className="container flex-align-items-center flex-container-column-direction">

                    <div className="card fade-in flex-1 max-width-600px min-width-600px-m " >


                        <div className="container flex-container-center min-width-600px-m fade-in padding0px border-radius15px">

                            <div className="min-width-600px-m">
                                {

                                    !isLoading && beacons.length > 0 ? beacons.map(beacon => {
                                            const {id, name, uuid, major, minor} = beacon;

                                            const BeaconComp = () => (

                                                <div className = "avail-beacon-element padding8px">

                                                    <div className="container flex-container-row-direction"  key={id}>
                                                        <div>
                                                            <div className="bt-symbol ">
                                                                <i className="material-icons">bluetooth</i>
                                                            </div>

                                                            <h3>Navn: {name}</h3>
                                                        </div>
                                                        <div>
                                                            <div className = "create-session-btn" onClick={evt => this.openDialog(evt, "summary", beacon)}>Info</div>

                                                        </div>

                                                    </div>
                                                </div>
                                            );
                                            return <BeaconComp/>
                                        }) :
                                        <div>

                                            <LoadingIcon src={LoadingIcon}/>
                                            <h3>Laster inn...</h3>
                                        </div>
                                }
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
            </div>

        )
    }
}

export default AllBeaconsListComponent;
