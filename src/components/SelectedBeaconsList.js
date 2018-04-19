import React from 'react'
import {Column} from '../components/Column';
import {XYPlot, XAxis, YAxis, LineMarkSeries, Hint, MarkSeries, LabelSeries} from 'react-vis';
import styled from 'styled-components';
import map from '../res/img/session-map.jpg';
import {CardOuter, TitleBar} from './Card.js';

class SelectedBeaconsList extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            currentHoverPoint : [],
            isHoveringPlotMap: true,
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






    render(){
        this.generateDataGrid();
        console.log(this.props.mapImgUrl);
        const sessionIndoorMap = "http://" + this.props.mapImgUrl; //TODO: get image url from session
        const IndoorMap = styled.img`
            width: 560px;
            height: 560px;
            position: absolute;
            margin-left:40px;
            z-index: 0;
`;

        const {currentHoverPoint, isHoveringPlotMap, clickedBeacon} = this.state;
        const tempArray = this.state.addedBeaconsToPlot;

        return(
            <div>
                <Column offsetLg="1"  xs ="12"  lg="3">

                    <CardOuter>
                        <TitleBar><h2>How to place beacons</h2> </TitleBar>
                        <p className="padding8px">Info on what to do HERE</p>

                    </CardOuter>
                    <CardOuter>
                        <TitleBar><h2>Selected beacons</h2> </TitleBar>
                        {
                            this.props.selectedBeacons.length > 0 ? this.props.selectedBeacons.map(beacon => {
                                const {id, name, uuid, major, minor, XCoordinate, YCoordinate} = beacon;
                                const BeaconComp = () => (
                                    <div className="padding8px" key={id+1}  >
                                        <p>Name: {name},</p>
                                        <p>UUID: {uuid} : Major: {major} : Minor: {minor}</p>
                                        <p>X: {XCoordinate} Y: {YCoordinate}</p>


                                        {clickedBeacon.name ===  beacon.name ?
                                            (<div className = "yellow-button" onClick={() => {this.clickSelectBeacon(beacon)}}>Selected</div>)
                                            : (<div className = "green-button" onClick={() => {this.clickSelectBeacon(beacon)}}>Select</div>) }
                                        <hr/>
                                    </div>
                                );
                                return <BeaconComp/>
                            }) : ''
                        }
                    </CardOuter>
                </Column>

                <Column offsetLg=""  xs ="12"  lg="7">

                    <CardOuter>
                        <TitleBar><h2>Create a session - Configure map</h2> </TitleBar>

                        <div className="plot-container">
                            <div className={"plot-map"}>

                                <XYPlot
                                    height={600}
                                    width={600}
                                    xDomain={[0, 100]}
                                    yDomain={[0, 100]}
                                    fill={"#2e82ff"}
                                >
                                    <MarkSeries
                                        size={"5px"}
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
                                    fill={"#2e82ff"}
                                    onMouseEnter={(event)=>{
                                        this.setState({
                                            isHoveringPlotMap : true
                                        });
                                        console.log("hovering, onMouseEnter" + isHoveringPlotMap);
                                    }}

                                    onClick ={(event)=>{
                                        if(clickedBeacon !== '') {
                                            const x = currentHoverPoint.x;
                                            const y = currentHoverPoint.y;
                                            clickedBeacon.XCoordinate =  currentHoverPoint.x;
                                            clickedBeacon.YCoordinate = currentHoverPoint.y;
                                            tempArray.push({"x" : x, "y" : y});
                                            console.log(tempArray);
                                            this.setState({
                                                addedBeaconsToPlot: tempArray
                                            });
                                            this.forceUpdate();

                                        }
                                    }}

                                    onMouseLeave={(event)=>{
                                        this.setState({
                                            isHoveringPlotMap : false
                                        });
                                        console.log("hovering, onMouseLeave : " + isHoveringPlotMap);

                                    }}

                                >
                                    <MarkSeries
                                        size={"1px"}
                                        data =  {this.generateDataGrid()}

                                        onNearestXY={(dataPoint, event)=>{
                                            this.setState({
                                                currentHoverPoint : dataPoint
                                            });
                                        }}


                                    />

                                    {this.state.isHoveringPlotMap ? (<Hint value={currentHoverPoint}>
                                        <div className="padding8px" style={{background: 'rgba(0,0,0, 0.5)'}}>

                                            <span>X: {currentHoverPoint.x}</span>
                                            <span> Y: {currentHoverPoint.y}</span>
                                        </div>
                                    </Hint>) : (<Hint value={0}>
                                        <div style={{background: 'rgba(0,0,0,0)'}}/>
                                    </Hint>)}



                                    <YAxis/>
                                    <XAxis/>
                                </XYPlot>

                            </div>
                            <IndoorMap src={sessionIndoorMap}/>

                        </div>
                    </CardOuter>
                </Column>

            </div>


        )
    }
}

export default SelectedBeaconsList;