import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import SessionList from "../components/AllSessionsList";

class AllSessions extends React.Component {

    render(){
        return(
            <div className="rounded-container">
                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Velg en session</h1>
                </div>
                    <SessionList/>

            </div>


        )
    }
}

export default AllSessions;