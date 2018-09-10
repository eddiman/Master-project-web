import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components';
import HelpButton from "../components/HelpButton";



class BeaconManagerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){

        return(
            <div className="rounded-container">
                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Administrering av beacons</h1>
                </div>
                <div className="container flex-container-center">

                    <Link to={"/beacons/add"}><div className="card flex-container-center">Legg til beacon</div></Link>
                    <Link to={"/beacons/all"}><div className="card flex-container-center">Liste over alle beacon</div></Link>
                </div>
                <div className="fixed-footer-menu flex-container-align-start">

                    <Link to={"/"}>
                        <div className="arrow-back-btn ">
                            <i className="material-icons md-36">keyboard_arrow_left</i>
                        </div>
                    </Link>

                </div>
                <HelpButton toUrl={'/manual/open/1'} fromUrl={this.props.location.pathname}/>
            </div>

        );

    }
}

export default BeaconManagerContainer;