import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionInfo from '../components/SessionInfo'
import SessionData from "../components/SessionData";
import Card from "../components/Card";
import LocationEvents from "../components/LocationEvents";

class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: parseInt(props.match.params.Id, 10),
            isLoading: true,
            session : [],
            currentDataPoint : []
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){

        this.setState({
            isLoading: true,
            session : []
        });


        fetch(`http://firetracker.freheims.xyz:8000/raw/session/${this.state.sessionId}`)
            .then(response => response.json())
            .then(parsedJSON => (this.setState(
                    {
                        session : parsedJSON,
                        isLoading : false
                    }
                )

            ))

            .catch(error => console.log('parsing failed', error))
    }

    nextCoordinate = (dataFromChild) => {
        this.setState({currentDataPoint : dataFromChild});
    };

    render(){
        const {isLoading, session, currentDataPoint} = this.state;
        const {Name} = session;
        return(
            <div className="container">
                <div className="card fade-in flex-1 min-width-300">
                    <LocationEvents session={!isLoading ? session : "bam" } callback={this.nextCoordinate}/>

                </div>

                    <div className="card fade-in flex-2">
                        <SessionData session={!isLoading ? session : "bam" } isLoading={isLoading} currentDataPoint={currentDataPoint}/>
                    </div>

                <div className="card fade-in flex-1 min-width-300">
                        <SessionInfo sessionObj={!isLoading ? session : "bam" }  />
                    </div>

            </div>





        )
    }
}

export default Session;