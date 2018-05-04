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
            session: this.props.session
        }
    }


    dateConverter(date) {
        return new Date(date);
    }


    render(){
        const {session} = this.props;
        const locations = session.Locations;
        console.log(locations);

        return(


            <div className="max-height-600 overflow-scroll-y">

                {

                    locations !== undefined ? locations.map(location => {
                        const {CreatedAt, XCoordinate, YCoordinate, Duration, Walking, HeadMovement} = location;
                        if(Duration !== 0){
                        const SessionComp = () => (

                            <div className="">
                                {this.dateConverter(CreatedAt).toLocaleString() + " "}
                                <p>{XCoordinate}</p>
                                <p>{YCoordinate}</p>
                                <p>{Duration}</p>
                                <p>{Walking.toString()}</p>
                                <p>{HeadMovement.toString()}</p>
                            </div>
                        );
                        return <SessionComp/> }
                    }) :
                        <div>
                            <LoadingIcon src={loadingIcon}/>
                            <h3>Loading...</h3>
                        </div>
                }
            </div>

        )
    }
}

export default LocationEvents;