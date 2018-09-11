import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../res/img/logo_fire_tracker.png"
import openSessionImg from "../res/img/open-session-splash.jpg"
import createSessionImg from "../res/img/create-session-splash.jpg"
import Styled from "styled-components";
import HelpButton from "../components/HelpButton";
import BeaconManagerButton from "../components/BeaconManagerButton";


class Home extends React.Component {

    render(){

        const HeaderImg = Styled.img`
        max-width: 300px;
        justify-content: center;
        align-self: center;
    `;


        return(
            <div className="rounded-container">

                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Velg en av tingene</h1>
                </div>
                <div className="container flex-container-center fade-in padding0px border-radius15px">
                    <Link to='/session'>
                        <div className="home-session-btn">
                            <img className="open-session-img" src={openSessionImg}/>
                            <div className="open-session-div">
                                <h1>Åpne økt</h1>
                            </div>
                        </div>
                    </Link>

                    <Link to='/create-session'>
                        <div className="home-session-btn">
                            <img className="create-session-img" src={createSessionImg}/>
                            <div className="create-session-div">
                                <h1>Lag en ny økt</h1>
                            </div>
                        </div>
                    </Link>

                </div>

                <HelpButton toUrl={'manual'} fromUrl={this.props.location.pathname}/>
                <BeaconManagerButton toUrl={'/beacons'} fromUrl={this.props.location.pathname}/>
            </div>

        )
    }
}

export default Home;