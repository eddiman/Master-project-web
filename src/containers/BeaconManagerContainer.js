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
                    <h1 className="margin24px roboto-black ">Administrering av beaconer</h1>
                </div>
                <div className="container flex-container-center flex-container-column-direction">
                    <h2><Link to={"/beacons/add"}><div className="card flex-container-center min-width-600px-m min-height-50px fade-in">Legg til beacon</div></Link> </h2>

                    <h2><Link to={"/beacons/all"}><div className="card flex-container-center min-width-600px-m min-height-50px fade-in">Liste over alle beaconer</div></Link></h2>
                </div>
                <div className="fixed-footer-menu flex-container-align-start">

                    <Link to={"/"}>
                        <div className="arrow-back-btn ">
                            <i className="material-icons md-36">keyboard_arrow_left</i>
                        </div>
                    </Link>

                </div>
            </div>

        );

    }
}

export default BeaconManagerContainer;
