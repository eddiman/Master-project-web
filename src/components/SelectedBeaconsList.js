import React from 'react'
import {Column} from '../components/Column';
import {
    XYPlot, XAxis, YAxis, LineMarkSeries, Hint, MarkSeries, LabelSeries,
    HorizontalGridLines, VerticalGridLines
} from 'react-vis';
import styled from 'styled-components';
import map from '../res/img/session-map.jpg';
import Card from "./Card";

class SelectedBeaconsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            clickedBeacon : '',
            addedBeaconsToPlot: []
        }

    }

    generateDataGrid(){
        let arrayGrid = [];
        for (let x = 0; x < 21; x++){
            for (let y = 0; y < 21; y++){
                let coord = {x: x*5, y: y*5};
                arrayGrid.push(coord);
            }
        }
        return arrayGrid;
    }

    clickSelectBeacon = (beacon) => {
        if(this.state.clickedBeacon === beacon) {
            //This is for unselecting a beacon
            this.setState ({
                clickedBeacon : ''
            });
        } else {
            this.setState ({
                clickedBeacon : beacon,
            });
            console.log("selectedBeacon: " + beacon.name)

        }
    };

    generateAddedBeaconsPlot(array) {

        for(let i = 0; i < this.props.selectedBeacons.length; i++) {
            array.push({"x" : this.props.selectedBeacons[i].x, "y" : this.props.selectedBeacons[i].y});
            console.log(array);
            this.setState({
                addedBeaconsToPlot: array
            });
        }

    }

    render(){
        this.generateDataGrid();
        console.log(this.props.mapImgUrl);
        const sessionIndoorMap = "http://" + this.props.mapImgUrl;
        const IndoorMap = styled.img`
            width: 560px;
            height: 560px;
            position: absolute;
            margin-left:40px;
            z-index: 0;
`;


        const {clickedBeacon} = this.state;
        const tempArray = this.state.addedBeaconsToPlot;

        return(
            <div className="container">

                <div className="card max-height-600 min-width-300  flex-1 overflow-scroll-y">
                    {
                        this.props.selectedBeacons.length > 0 ? this.props.selectedBeacons.map(beacon => {
                            const {id, name, uuid, major, minor, XCoordinate, YCoordinate} = beacon;
                            const BeaconComp = () => (
                                <div className = {clickedBeacon.name ===  beacon.name ? ("padding8px gray-marked") : 'padding8px'} key={id+1}
                                     onClick={() => {this.clickSelectBeacon(beacon)}}>
                                    <h2>Name: {name}</h2>
                                    <p>UUID: {uuid}</p>
                                    <p>Major: {major} | Minor: {minor}</p>
                                    <div className = {XCoordinate ? "green-marked" : "red-marked"} >
                                        <h3> <b>X: {XCoordinate} Y: {YCoordinate} </b></h3>
                                    </div>

                                    {clickedBeacon.name ===  beacon.name ?
                                        (<div className = "yellow-marked" >Selected</div>)
                                        : (<div className = "blue-marked" onClick={() => {this.clickSelectBeacon(beacon)}}>Select this beacon</div>) }
                                    <hr/>
                                </div>
                            );
                            return <BeaconComp/>
                        }) : <p>Select a beacon</p>
                    }
                </div>


                <div className="card flex-2">

                    <div className="plot-container">
                        <div className={"plot-map"}>
                            <XYPlot
                                height={600}
                                width={600}
                                xDomain={[0, 100]}
                                yDomain={[0, 100]}
                                //fill={"#2e82ff"}
                            >
                                <MarkSeries
                                    size={"8px"}
                                    data =  {this.state.addedBeaconsToPlot}
                                />

                            </XYPlot>

                        </div>
                        <div className={"plot-map"}>

                            <XYPlot
                                height={600}
                                width={600}

                                xDomain={[0, 100]}
                                yDomain={[0, 100]}
                                fill={"rgba(1, 1, 1, 0.0)"}

                                >
                                <VerticalGridLines
                                    tickTotal="20"
                                    style={{stroke: "#c3c3c3"} }


                                />
                                <HorizontalGridLines
                                    tickTotal="20"
                                    style={{stroke: "#c3c3c3"} }

                                />
                            <MarkSeries
                                size={"16px"}
                                data =  {this.generateDataGrid()}
                                style={{strokeWidth: 0} }

                                onValueClick ={(datapoint, event)=>{
                                    if(clickedBeacon !== '') {
                                        clickedBeacon.XCoordinate =  datapoint.x;
                                        clickedBeacon.YCoordinate = datapoint.y;
                                        tempArray.push({"x" : clickedBeacon.XCoordinate, "y" : clickedBeacon.YCoordinate});
                                        this.setState({
                                            addedBeaconsToPlot: tempArray});
                                        this.forceUpdate();
                                    }
                                }}

                            />

                            <YAxis/>
                            <XAxis/>
                        </XYPlot>

                    </div>
                    <IndoorMap src={sessionIndoorMap}/>

                </div>
            </div>

        <div className="card flex-1 min-width-300 " >
            <p className="padding8px">Info on what to do HERE</p>
        </div>
    </div>


    )
    }
}

export default SelectedBeaconsList;