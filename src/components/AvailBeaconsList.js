import React from 'react'
import {Column} from '../components/Column';
import {Row} from '../components/Row';
import styled from 'styled-components';
import loadingIcon from '../res/img/gear-loading.png'


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

class AvailBeaconList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            beacons: []
        }
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData(){

        this.setState({
            isLoading: true,
            sessions: []
        });


        fetch('http://firetracker.freheims.xyz:8000/beacons')
            .then(response => response.json())

            .then(parsedJSON => parsedJSON.map(beacon => (
                {
                    id: `${beacon.ID}`,
                    createdAt: `${beacon.CreatedAt}`,
                    updatedAt: `${beacon.UpdatedAt}`,
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



    render(){
        const {isLoading, beacons} = this.state;



        console.log(beacons);
        return(


            <div>

                {


                    !isLoading && beacons.length > 0 ? beacons.map(beacon => {
                        const {id, createdAt, updatedAt, name, user, major, minor} = beacon;
                        const BeaconComp = () => (
                                <Row>
                                    <Column xs="12" lg="12" key={id}>
                                        Name: {name}, UUID: {user} : Major: {major} : Minor: {minor}
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