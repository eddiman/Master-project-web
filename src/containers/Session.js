import React from 'react'
import SessionInfo from '../components/SessionInfo'
import SessionData from "../components/SessionData";
import LocationEvents from "../components/LocationEvents";
import HelpButton from "../components/HelpButton";
import Link from "react-router-dom/es/Link";

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


        fetch(`http://firetracker.freheims.xyz:8000/session/${this.state.sessionId}`)
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
            <div className="rounded-container">
                <div className="container ">
                    <h1 className="margin24px fade-in roboto-black ">{Name}</h1>
                </div>
            <div className="container">
                <div className="card fade-in flex-1 min-width-300">
                    <LocationEvents session={!isLoading ? session : "bam" } callback={this.nextCoordinate}/>

                </div>

                    <div className="card fade-in flex-2 plot-map-card">
                        <SessionData session={!isLoading ? session : "bam" } isLoading={isLoading} currentDataPoint={currentDataPoint}/>
                    </div>

                <div className="card fade-in flex-1 min-width-300">
                        <SessionInfo sessionObj={!isLoading ? session : "bam" }  />
                    </div>

            </div>

                <div className="fixed-footer-menu flex-container-align-start">

                    <Link to={"/session"}>
                        <div className="arrow-back-btn ">
                            <i className="material-icons md-36">keyboard_arrow_left</i>
                        </div>
                    </Link>

                </div>
                <HelpButton toUrl={'/manual/open/2'} fromUrl={this.props.location.pathname}/>

            </div>




        )
    }
}

export default Session;
