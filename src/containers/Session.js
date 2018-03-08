import React from 'react'
import {CardOuter, DarkBar, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import SessionInfo from '../components/SessionInfo'
import SessionData from "./SessionData";

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
        console.log(session);

        return(
            <div>
                <Column offsetLg="2"  xs ="12"  lg="6">
                    <CardOuter>
                        <TitleBar><h2>{!isLoading ? "Session: " + Name : "Loading session..." }</h2> </TitleBar>
                        <SessionData sessionObj={!isLoading ? session : "bam" }/>
                    </CardOuter>
                </Column>

                <Column offsetLg="0"  xs ="12"  lg="2">
                    <CardOuter>
                        <TitleBar><h2>{"Data" }</h2> </TitleBar>
                        <SessionInfo sessionObj={!isLoading ? session : "bam" }/>
                    </CardOuter>
                </Column>


            </div>





        )
    }
}

export default Session;