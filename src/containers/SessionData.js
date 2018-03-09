import React from 'react'
import {XYPlot, XAxis, YAxis, LineMarkSeries} from 'react-vis';
import theme from '../theme/theme';
import styled from 'styled-components';
import map from '../res/img/session-map.jpg';

class SessionData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            session : props.sessionObj,
        }
    }


    render(){
        const session = this.props.sessionObj;
        const {ID, CreatedAt, UpdatedAt, Name, User, StartTime, EndTime} = session;
        const sessionIndoorMap = map; //TODO: get image url from session
        const IndoorMap = styled.img`
            width: 560px;
            height: 560px;
            position: absolute;
            left:40px;
            bottom:40px;
`;

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
                        data={[
                            {x: 5, y: 60},
                            {x: 30, y: 53},
                            {x: 60, y: 45},
                            {x: 60, y: 35},
                            {x: 10, y: 35},
                            {x: 5, y: 55}

                        ]}/>
                    <YAxis/>
                    <XAxis/>
                </XYPlot>

            </div>



        )
    }
}

export default SessionData;