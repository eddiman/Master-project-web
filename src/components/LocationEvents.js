import React from 'react'
import { Link } from 'react-router-dom'
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

class LocationEvents extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            session: this.props.session,
            currentLocationObject : 0
        }
    }


    dateConverter(date) {
        return new Date(date);
    }
    goToNextCoord(evt){
        const {currentLocationObject} = this.state;
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0 && this.props.session.Locations !== undefined) {
            let counter = currentLocationObject;
            const {callback} = this.props;
            const locations = this.props.session.Locations;
            callback([{x: locations[counter].XCoordinate, y: locations[counter].YCoordinate}]);

            this.setState({
                currentLocationObject: counter+1
            })

        }
    }

    render(){
        const {session} = this.props;
        const locations = session.Locations;
        return(
            <div>

                <div className="max-height-600 overflow-scroll-y">

                    {

                        locations !== undefined ? locations.map(location => {
                            const {CreatedAt, XCoordinate, YCoordinate, Duration, Walking, HeadMovement} = location;
                            if(locations){
                                const LocationComp = () => (

                                    <div key={locations.ID} className="">
                                        {this.dateConverter(CreatedAt).toLocaleString() + " "}
                                        <p>{XCoordinate}</p>
                                        <p>{YCoordinate}</p>
                                        <p>{Duration}</p>
                                        <p>{Walking.toString()}</p>
                                        <p>{HeadMovement.toString()}</p>
                                    </div>
                                );
                                return <LocationComp/> }
                        }) :
                            <div>
                                <LoadingIcon src={loadingIcon}/>
                                <h3>Loading...</h3>
                            </div>
                    }


                </div>
                <button className="green-button" onClick={evt => this.goToNextCoord(evt)}>
                    Next coordinate
                </button>
            </div>
        )
    }
}

export default LocationEvents;