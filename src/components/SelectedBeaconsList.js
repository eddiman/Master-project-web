import React from 'react'
import {
    XYPlot, XAxis, YAxis, MarkSeries,
    HorizontalGridLines, VerticalGridLines
} from 'react-vis';
import styled from 'styled-components';

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
        const tempStyle = {width : "84%"};
        return(
            <div className="card container flex-container-row-direction " style = {tempStyle}>

                <div className="rounded-box-border  fade-in max-height-600 min-width-300 flex-1 overflow-scroll-y">
                    {
                        this.props.selectedBeacons.length > 0 ? this.props.selectedBeacons.map(beacon => {
                            const {id, name, XCoordinate, YCoordinate} = beacon;
                            const BeaconComp = () => (
                                <div className = {XCoordinate ? ('beacon-element-marked avail-beacon-element margin-top32px') : 'avail-beacon-element margin-top32px'}>
                                    <div className = {clickedBeacon.name ===  beacon.name ? ('gray-marked padding8px') : 'padding8px'} key={id+1}
                                         onClick={() => {this.clickSelectBeacon(beacon)}}>

                                        <div className="container flex-container-column-direction flex-align-items-center">
                                            {XCoordinate ? (<div className="bt-symbol large bt-symbol-center-top ">
                                                <i className="material-icons md-48">bluetooth</i>
                                            </div>)
                                                : (<div className="bt-symbol large bt-symbol-non-marked bt-symbol-center-top ">
                                                    <i className="material-icons md-48">bluetooth</i>
                                                </div>)
                                            }
                                            <h2 className="no-margin">{name}</h2>

                                            <p>{XCoordinate ? ("Denne beaconen er plassert på X: " + XCoordinate + "," + "Y: " + YCoordinate)
                                                : 'Denne beaconen har ikke blitt plassert enda'}</p>


                                            {clickedBeacon.name ===  beacon.name ?
                                                (<div className = "create-session-btn" >Valgt</div>)
                                                : (<div className = "create-session-btn" onClick={() => {this.clickSelectBeacon(beacon)}}>Velg</div>) }
                                        </div>
                                    </div>
                                </div>
                            );
                            return <BeaconComp/>
                        }) : <p>Velg en beacon</p>
                    }
                </div>


                <div className="rounded-box-border  min-height-70vh flex-2">

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

            </div>


        )
    }
}

export default SelectedBeaconsList;
