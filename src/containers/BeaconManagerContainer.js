import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components';


const InputField = styled.input`
        border-bottom: 1px solid;
        border-bottom-color: #fbb033;
        border-top: none;
        border-left: none;
        border-right: none;
        margin: 16px;
        border-radius: 3px;
        height: 32px;
        font-size: 1.1em;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        width:90%;
        transition: border-bottom-color .3s,  border-bottom .3s;
            ${InputField}:focus {
            outline:none;
            border-bottom: 1px solid;
            border-bottom-color: ${props => props.color};
              }
        `;
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

            </div>
        );

    }
}

export default BeaconManagerContainer;