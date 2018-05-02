import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionInfo from '../components/SessionInfo'
import SessionData from "../components/SessionData";
import Card from "../components/Card";

class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: parseInt(props.match.params.Id, 10),
            isLoading: true,
            session : []
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

    render(){
        const {isLoading, session} = this.state;
        const {Name} = session;
        //const width = () => {document.getElementById('plot').offsetWidth};


        return(
            <div className="container">
                <Card titleText="Events" />

                    <Card titleText = {!isLoading ? "Session: " + Name : "Loading session..." } flexDirection ="column">
                        <SessionData session={!isLoading ? session : "bam" } isLoading={isLoading}/>
                    </Card>

                    <Card titleText="Info" flexDirection ="column">
                        <SessionInfo sessionObj={!isLoading ? session : "bam" }  />
                    </Card>

            </div>





        )
    }
}

export default Session;