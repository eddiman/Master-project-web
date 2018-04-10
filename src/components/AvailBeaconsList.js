import React from 'react'
import {Column} from '../components/Column';
import {Row} from '../components/Row';
import styled from 'styled-components';
import loadingIcon from '../res/img/gear-loading.png'

const LoadingIcon = styled.img`
    animation: App-logo-sspin infinite 10s linear;
    margin: 32px; 
    height: 60px;
    opacity: 0.3;
    @keyframes App-logo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
    }

`;

class AvailBeaconList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            beacons: [],
            selectedBeacons : []
        };


    }


    componentDidMount(){
        this.fetchData();
    }


    fetchData(){

        this.setState({
            isLoading: true,
            beacons: []
        });


        fetch('http://firetracker.freheims.xyz:8000/beacons')
            .then(response => response.json())

            .then(parsedJSON => parsedJSON.map(beacon => (
                {
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


    toggleCheckbox(id) {
        let div = document.getElementById("beaconComp");
        if (this.handleCheck(id)) {
            this.removeBeacon(id);
        } else {
            this.addBeacon(id);

        }

    };

    getBeacon(id) {
        for (let i = 0; i < this.state.beacons.length; i++) {
            if(this.state.beacons[i].id === id) {
                return this.state.beacons[i];
            }
        }
    }

    removeBeacon(id) {
        const {callback} = this.props;

        let newSelectedBeacons = this.state.selectedBeacons;

        for (let i = 0; i < newSelectedBeacons.length; i++) {
            if(newSelectedBeacons[i].id === id) {
                newSelectedBeacons.splice(i, 1);
                this.setState({
                    selectedBeacons : newSelectedBeacons
                });
                callback(newSelectedBeacons);

            }
        }

    }
    addBeacon(id) {
        const {callback} = this.props;
        const beacon = this.getBeacon(id);

        let newSelectedBeacons = this.state.selectedBeacons;
        newSelectedBeacons.push(beacon);
        callback(newSelectedBeacons);
        this.setState({
            selectedBeacons : newSelectedBeacons
        });

    }


    handleCheck(val) {
        return this.state.selectedBeacons.some(beacon => val === beacon.id);
    }


    render(){
        const {isLoading, beacons} = this.state;
        const Added = () => (
            <div className = "green-button">added</div>
        );
        const NotAdded = () => (
            <div className = "red-button">not added</div>
        );
        return(

            <div>
                {
                    !isLoading && beacons.length > 0 ? beacons.map(beacon => {
                        const {id, createdAt, updatedAt, name, uuid, major, minor} = beacon;
                        const BeaconComp = () => (
                            <Row>
                                <Column  xs="12" lg="12" key={id} onClick={() => this.toggleCheckbox(id)}>
                                    <p>Name: {name},</p>
                                    <p>UUID: {uuid} : Major: {major} : Minor: {minor}</p>

                                    {this.handleCheck(id) ? <Added/> : <NotAdded/>}

                                    <hr/>
                                </Column>
                            </Row>
                        );
                        return <BeaconComp/>
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

export default AvailBeaconList;
