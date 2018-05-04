import React from 'react'
import {XYPlot, XAxis, YAxis, LineMarkSeries, MarkSeries} from 'react-vis';
import styled from 'styled-components';
import map from '../res/img/session-map.jpg';

class SessionData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            session : props.session,
            isLoading : props.isLoading,
            dataXY : []
        };
    }

    processCoord(){
        const locations = this.props.session.Locations;
        let dataXYArray = [];

        for(let i = 0; i < locations.length; i++) {
            let currentXY = {
                x: locations[i].XCoordinate, y: locations[i].YCoordinate
            };
            dataXYArray.push(currentXY);

        }
        return dataXYArray;
    };

    processBeaconCoord() {
        const beacons = this.props.session.Beacons;
        let dataXYArray = [];

        for(let i = 0; i < beacons.length; i++) {
            let currentXY = {
                x: beacons[i].XCoordinate, y: beacons[i].YCoordinate
            };
            dataXYArray.push(currentXY);

        }
        return dataXYArray;
    };


    render(){
        const session = this.props.session;
        //const {ID, Name, User, StartTime, EndTime, Locations} = session;
        const sessionIndoorMap = "http://" + session.Map; //TODO: get image url from session
        const IndoorMap = styled.img`
            width: 560px;
            height: 560px;
            position: absolute;
            margin-left:40px;
            z-index: 0;`;
        let dataCoordArrayXY = [];
        let dataBeaconsArrayXY = [];
        if(!this.props.isLoading) {
            dataCoordArrayXY = this.processCoord();
            dataBeaconsArrayXY = this.processBeaconCoord();
        }

        return(
            <div className="plot-container">
                <div className={"plot-map"}>
                    <IndoorMap src={sessionIndoorMap}/>
                    <div className="plot-map">
                        <XYPlot
                            width={600}
                            height={600}
                            xDomain={[0, 100]}
                            yDomain={[0, 100]}
                            fill={"#042637"}
                            strokeWidth="1px"
                            opacity ="0.5 "
                        >

                            <LineMarkSeries
                                stroke="#7f7f7f"
                                size={"3px"}
                                style={{ strokeLinejoin: "round"}}
                                data={dataCoordArrayXY}/>

                            <YAxis/>
                            <XAxis/>
                        </XYPlot>
                    </div>
                    <div className="plot-map">

                        <XYPlot
                            width={600}
                            height={600}
                            xDomain={[0, 100]}
                            yDomain={[0, 100]}
                            fill={"#2e82ff"}   >

                            <MarkSeries
                                size={"5px"}
                                style={{strokeLinejoin: "round"}}
                                data={dataBeaconsArrayXY}

                                />
                            <YAxis/>
                            <XAxis/>
                        </XYPlot>
                    </div>
                </div>
            </div>


        )
    }
}

export default SessionData;