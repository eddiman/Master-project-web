import React from 'react'
import {Column} from '../components/Column';
import {XYPlot, FlexibleWidthXYPlot, XAxis, YAxis, LineMarkSeries, Hint, MarkSeries, LabelSeries} from 'react-vis';
import styled from 'styled-components';
import map from '../res/img/session-map.jpg';
import {CardOuter, TitleBar} from './Card.js';
import {Row} from './Row';

class SelectedBeaconsList extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            currentHoverPoint : [],
            hoverPlot: false,
            clickedBeacon : ''
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

    clickBeacon = (beacon) => {
        if(this.state.clickedBeacon === beacon) {
            this.setState ({
                clickedBeacon : ''
            });
        } else {
            this.setState ({
                clickedBeacon : beacon
            });
            console.log("selectedBeacon: " + beacon.name)

        }
    };






    render(){
        this.generateDataGrid();
        const sessionIndoorMap = map; //TODO: get image url from session
        const IndoorMap = styled.img`
            width: 560px;
            height: 560px;
            position: relative;
            bottom:600px;
            left:40px;
            z-index: -1;
`;
        const SelectedBeacon = () => (
            <div className = "yellow-button">Selected</div>
        );

        const {currentHoverPoint, hoverPlot, clickedBeacon} = this.state;

        return(
            <div>
                <Column offsetLg="1"  xs ="12"  lg="6">

                    <CardOuter>
                        <TitleBar><h2>Create a session - Configure map</h2> </TitleBar>
                        <div className={"plotMap"}>

                            <XYPlot
                                height={600}
                                width={600}
                                xDomain={[0, 100]}
                                yDomain={[0, 100]}
                                fill={"#2e82ff"}
                                onMouseEnter={(event)=>{
                                    this.setState({
                                        hoverPlot : true
                                    });
                                    console.log(hoverPlot)
                                }}
                                onMouseDown={(event)=>{

                                    if(clickedBeacon !== '') {
                                        const x = currentHoverPoint.x;
                                        const y = currentHoverPoint.y;
                                        clickedBeacon.XCoordinate = currentHoverPoint.x;
                                        clickedBeacon.YCoordinate = currentHoverPoint.y;
                                    }
                                }}

                                onMouseLeave={(event)=>{
                                    this.setState({
                                        hoverPlot : false
                                    });
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
                                <Hint value={currentHoverPoint}>
                                    <div className="padding8px" style={{background: 'rgba(0,0,0, 0.5)'}}>
                                        <span>X: {currentHoverPoint.x}</span>
                                        <span> Y: {currentHoverPoint.y}</span>
                                    </div>
                                </Hint>

                                <IndoorMap src={sessionIndoorMap}/>

                                <YAxis/>
                                <XAxis/>
                            </XYPlot>

                        </div>
                    </CardOuter>
                </Column>

                <Column offsetLg=""  xs ="12"  lg="3">

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
                                    <div className="padding8px" key={id+1} onClick={() => {this.clickBeacon(beacon)}} >
                                        <p>Name: {name},</p>
                                        <p>UUID: {uuid} : Major: {major} : Minor: {minor}</p>
                                        <p>X: {XCoordinate} Y: {YCoordinate}</p>
                                        {clickedBeacon.name ===  beacon.name ? <SelectedBeacon/> : ''}
                                        <hr/>
                                    </div>
                                );
                                return <BeaconComp/>
                            }) : ''
                        }
                    </CardOuter>
                </Column>
            </div>


        )
    }
}

export default SelectedBeaconsList;