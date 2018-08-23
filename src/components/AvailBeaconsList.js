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


    addBeaconToSelectedList(id) {
        if (this.checkIfBeaconIsAlreadySelected(id)) {
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


    checkIfBeaconIsAlreadySelected(beaconToCheck) {
        return this.state.selectedBeacons.some(beacon => beaconToCheck === beacon.id);
    }


    render(){
        const {isLoading, beacons} = this.state;

        return(

            <div className="overflow-scroll-y flex-container-row-direction">
                {
                    !isLoading && beacons.length > 0 ? beacons.map(beacon => {
                        const {id, name, uuid, major, minor} = beacon;
                        const BeaconComp = () => (

                            <div className = {this.checkIfBeaconIsAlreadySelected(id) ? ("avail-beacon-element beacon-element-marked padding8px") : 'avail-beacon-element padding8px'}>

                                <div className="container flex-container-row-direction"  key={id} onClick={() => this.addBeaconToSelectedList(id)}>
                                    <div>
                                        {this.checkIfBeaconIsAlreadySelected(id) ? (<div className="bt-symbol ">
                                            <i className="material-icons">bluetooth</i>
                                        </div>)
                                            : (<div className="bt-symbol bt-symbol-non-marked">
                                                <i className="material-icons">bluetooth</i>
                                            </div>)
                                        }
                                        <h3>Navn: {name}</h3>
                                    </div>
                                    <div>
                                        <div className = "btn-rounded">Tek. Info.</div>

                                        {this.checkIfBeaconIsAlreadySelected(id) ? (<div className = "btn-red-color">Fjern</div>)
                                            : (<div className = "btn-rounded">Legg til</div>)

                                        }
                                    </div>

                                </div>
                            </div>
                        );
                        return <BeaconComp/>
                    }) :
                        <div>

                            <LoadingIcon src={loadingIcon}/>
                            <h3>Laster inn...</h3>
                        </div>
                }
            </div>

        )
    }
}

export default AvailBeaconList;
