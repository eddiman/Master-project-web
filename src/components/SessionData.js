import React from 'react'
import {XYPlot, XAxis, YAxis, LineMarkSeries} from 'react-vis';
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
            console.log(currentXY);

        }
        return dataXYArray;
    };

    render(){
        const session = this.props.session;
        //const {ID, Name, User, StartTime, EndTime, Locations} = session;
        const sessionIndoorMap = map; //TODO: get image url from session
        const IndoorMap = styled.img`
            width: 560px;
            height: 560px;
            position: absolute;
            left:40px;
            bottom:40px;`;
        let dataArrayXY = [];
        if(!this.props.isLoading) {
             dataArrayXY = this.processCoord();
        }

        return(
            <div className={"plotMap"}>
                <IndoorMap src={sessionIndoorMap}/>
                <XYPlot
                    width={600}
                    height={600}
                    xDomain={[0, 100]}
                    yDomain={[0, 100]}
                    fill={"#2e82ff"}   >

                    <LineMarkSeries
                        stroke={"#414141"}
                        size={"8px"}
                        style={{strokeLinejoin: "round"}}
                        data={dataArrayXY}/>
                    <YAxis/>
                    <XAxis/>
                </XYPlot>

            </div>



        )
    }
}

export default SessionData;