import React from 'react'
import {XYPlot, XAxis, YAxis, LineMarkSeries, MarkSeries} from 'react-vis';
import styled from 'styled-components';
import {curveCatmullRom} from 'd3-shape';
import ExifOrientationImg from 'react-exif-orientation-img'


class SessionData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            session : props.session,
            isLoading : props.isLoading,
            dataXY : [],
            screenWidth : 300
        };
    }

    processCoord(){
        const locations = this.props.session.Locations;
        let dataXYArray = [];

        //const {CreatedAt, XCoordinate, YCoordinate, Duration, Walking, HeadMovement} = location;

        for(let i = 0; i < locations.length; i++) {
            if(locations[i]){
                let currentXY = {
                    x: locations[i].XCoordinate, y: locations[i].YCoordinate,  color: "red", size : this.calcMarkSize(locations[i].Duration)
                };
                dataXYArray.push(currentXY);
            }

        }
        return dataXYArray;
    };

    calcMarkSize(duration){
        if (duration !== 0) {
            return Math.round(duration / 1000) ;
        } else {
            return 3;
        }
    }

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

    shouldComponentUpdate() {

        return true;
    }

    calculatePlotMapSize(){
        let plotMapWidth = 600;
        const screenWidth = window.innerWidth;
        if(screenWidth > 600){

            return plotMapWidth;
        } else {
            return screenWidth - 96;
        }

    }

    render(){
        const session = this.props.session;
        //const {ID, Name, User, StartTime, EndTime, Locations} = session;
        const sessionIndoorMap = "http://" + session.Map; //TODO: get image url from session
        const plotMapSize = this.calculatePlotMapSize();
        const IndoorMap = styled.img`
            width: ${plotMapSize - 40}px;
            height: ${plotMapSize - 40}px;
            position: absolute;
            margin-left:40px;
            z-index: 0;`;

        const IndoorMapStyle = {
            width: (plotMapSize - 40) + 'px',
            height: (plotMapSize - 40) + 'px',
            position: 'absolute',
            marginLeft:'40px',
            zIndex: '0',

        };

        const PlotMap = styled.div`
        max-width: 600px;
        min-width: ${plotMapSize}px;
        min-height: ${plotMapSize}px;
        position: absolute;
        margin-top: 16px;
        z-index: 10;
        `;




        let dataCoordArrayXY = [];
        let dataBeaconsArrayXY = [];

        if(!this.props.isLoading) {
            dataCoordArrayXY = this.processCoord();
            dataBeaconsArrayXY = this.processBeaconCoord();


        }

        return(
            <div>

                <div className="plot-container">


                    <PlotMap>

                        <ExifOrientationImg style={IndoorMapStyle} src={sessionIndoorMap}/>

                        <XYPlot
                            width={plotMapSize}
                            height={plotMapSize}
                            xDomain={[0, 100]}
                            yDomain={[0, 100]}
                        >

                            <LineMarkSeries
                                data={dataCoordArrayXY}
                                curve={curveCatmullRom.alpha(0.2)}
                                strokeWidth={"1px"}
                                sizeRange={[5, 15]}

                            />

                            <YAxis/>
                            <XAxis/>
                        </XYPlot>
                    </PlotMap>
                    <PlotMap>

                        <XYPlot
                            width={plotMapSize}
                            height={plotMapSize}
                            xDomain={[0, 100]}
                            yDomain={[0, 100]}
                            fill={"#2e82ff"}   >

                            <MarkSeries
                                size={"5px"}
                                style={{strokeLinejoin: "round"}}
                                data={dataBeaconsArrayXY}
                            />
                        </XYPlot>
                    </PlotMap>

                    <div className={"plot-map"}>

                        <XYPlot
                            width={plotMapSize}
                            height={plotMapSize}
                            xDomain={[0, 100]}
                            yDomain={[0, 100]}
                        >

                            <LineMarkSeries
                                style={{strokeLinejoin: "round"}}
                                data={this.props.currentDataPoint}
                                colorType="literal"
                                animation

                                sizeRange={[3, 5]}
                                stroke="#fbb033"
                                strokeWidth="1"

                            />
                        </XYPlot>
                    </div>


                </div>
            </div>



        )
    }
}

export default SessionData;