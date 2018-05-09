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
            currentLocationIndex : -1,
            currentLocationObject : [],
            eventSequenceIsPlaying : false
        }
    }


    dateConverter(date) {
        return new Date(date);
    }

    millisToMinutesAndSeconds(millis) {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    goToLocationEventHandler(evt, count) {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0 && this.props.session.Locations !== undefined) {
            this.goToLocationEvent(count);
        }
    }

    goToLocationEvent(count) {
        console.log(count);
        const locations = this.props.session.Locations;
        const {callback} = this.props;

        if (count === 0) {
            callback([
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 1, color : "lightblue"},
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 2, color : "red"  }]);

        } else if (count < 0){
            count = locations.length-1;
            callback([
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 1, color : "lightblue"},
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 2, color : "red"  }]);
        } else if (count > locations.length-1) {
            count = 0;

            callback([
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 1, color : "lightblue"},
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 2, color : "red"  }]);
        }
        else {
            callback([
                {x: locations[count - 1].XCoordinate, y: locations[count - 1].YCoordinate, size: 1, color : "lightblue"},
                {x: locations[count].XCoordinate, y: locations[count].YCoordinate, size: 2, color : "red"  }
            ]);
        }

        this.setState({
            currentLocationIndex: count,
            currentLocationObject: locations[count],

        });
        this.refer.childNodes[count].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

    }




    playAllLocationEvents(evt) {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0 && this.props.session.Locations !== undefined) {

            this.setState({
                eventSequenceIsPlaying : true

            }, () => {

                this.recursive(this.state.currentLocationIndex +1);
            });


        }
    }

    stopPlayAllLocationEvents(evt) {
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0 && this.props.session.Locations !== undefined) {

            this.setState({
                eventSequenceIsPlaying : false
            });
        }
    }



    recursive(count) {
        const locations = this.props.session.Locations;

        if (count === locations.length || !this.state.eventSequenceIsPlaying){
            return;
        }
        this.goToLocationEvent(count);

        setTimeout(() => {
            this.recursive(count + 1)
        }, 1000);
    }



    render(){
        const {session} = this.props;
        const {currentLocationIndex, currentLocationObject} = this.state;

        const locations = session.Locations;
        return(
            <div>

                <div className="max-height-600 overflow-scroll-y" ref={(el) => { this.refer = el;}}>

                    {

                        locations !== undefined ? locations.map( (location, index) => {
                            const {ID, CreatedAt, XCoordinate, YCoordinate, Duration, Walking, HeadMovement} = location;
                            if(locations){
                                const LocationComp = () => (
                                    <div key={ID}
                                         className = {currentLocationObject.ID === ID ? ('card gray-marked') : 'card'}
                                         onClick={evt => this.goToLocationEventHandler(evt, index)}>
                                        <h1>Event nr: {index+1}</h1>
                                        <span>Time: </span>{this.dateConverter(CreatedAt).toLocaleString() + " "}
                                        <span>X: {XCoordinate}, Y: {YCoordinate}</span>
                                        <span>Duration: {this.millisToMinutesAndSeconds(Duration)}</span>
                                        <hr/>
                                        { Walking ? (<span className="green-marked">Was walking at this location.</span>)
                                            : (<span className="red-marked">Was not walking at this location.</span>)}
                                        { HeadMovement ? (<span className="green-marked">Was moving the head at this location.</span>)
                                            : (<span className="red-marked">Was not moving the head at this location.</span>)}

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
                <div className="container space-between">
                    <p>Click on the buttons under to step through the session.</p>

                    <button className="yellow-button margin8px" onClick={evt => this.goToLocationEventHandler(evt, currentLocationIndex-1)}>
                        ◀◀
                    </button>

                    {

                        this.state.eventSequenceIsPlaying ? (
                            <button className="red-button margin8px" onClick={evt => this.stopPlayAllLocationEvents(evt)}>⏹</button>
                        ) :
                            (
                                <button className="green-button margin8px" onClick={evt => this.playAllLocationEvents(evt)}>▶</button>
                            )
                    }

                    <button className="yellow-button margin8px" onClick={evt => this.goToLocationEventHandler(evt, currentLocationIndex+1)}>
                        ▶▶
                    </button>
                </div>
            </div>
        )
    }
}

export default LocationEvents;