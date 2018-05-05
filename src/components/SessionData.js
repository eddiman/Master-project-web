import React from 'react'
import {XYPlot, XAxis, YAxis, LineMarkSeries, MarkSeries} from 'react-vis';
import styled from 'styled-components';
import {curveCatmullRom} from 'd3-shape';


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
            <div>

                <div className="plot-container">


                    <div className={"plot-map"}>
                        <IndoorMap src={sessionIndoorMap}/>

                        <XYPlot
                                width={600}
                                height={600}
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
                            </XYPlot>
                        </div>

                    <div className="plot-map">

                        <XYPlot
                            width={600}
                            height={600}
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