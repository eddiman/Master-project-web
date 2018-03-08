import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, LineSeries} from 'react-vis';


class SessionData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            session : props.sessionObj
        }
    }

    render(){
        const session = this.props.sessionObj;
        console.log(session);
        const {ID, CreatedAt, UpdatedAt, Name, User, StartTime, EndTime} = session;
        return(
<div>
            <XYPlot
                width={600}
                height={600}
                xDomain={[0, 100]}
                yDomain={[0, 100]}
                fill={"#2f2f2f"}   >

                <LineMarkSeries
                    stroke={"red"}
                    fill={"#fbb033"}
                    size={"10px"}
                    style={{strokeLinejoin: "round"}}
                    data={[
                        {x: 1, y: 10},
                        {x: 20, y: 5},
                        {x: 79, y: 15},
                        {x: 4, y: 20},
                        {x: 40, y: 70},
                        {x: 10, y: 50}

                    ]}/>
                <XAxis/>
                <YAxis/>
            </XYPlot>
    <XYPlot height={200} width={200}>
        <LineSeries data={[
            {x: 0, y: 8},
            {x: 1, y: 5},
            {x: 2, y: 4},
            {x: 3, y: 9},
            {x: 4, y: 1},
            {x: 5, y: 7},
            {x: 6, y: 6},
            {x: 7, y: 3},
            {x: 8, y: 2},
            {x: 9, y: 0}
        ]} /></XYPlot>



</div>



        )
    }
}

export default SessionData;